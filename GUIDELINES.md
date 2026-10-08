# eGP Solution Engineering & Architecture Guidelines

Welcome to the **eGP Solution** engineering standard. This document defines the architectural rules, coding standards, and reusability protocols for all developers and AI assistants working on this monorepo.

---

## 1. Monorepo Structure & Strict Boundaries

```
egp-solution/
├── apps/
│   ├── admin/               # Next.js App Router (UI Shell, Pages, Routes, Server Actions)
│   └── web/                 # Public web portal (if applicable)
├── packages/
│   ├── ui/                  # @egp/ui: Pure, stateless shadcn-style design system
│   ├── schema/              # @egp/schema: Single source of truth for Zod schemas & types
│   └── api-client/          # @egp/api-client: Typed Next.js fetch client with Mock Auth & RFC 7807
```

### Boundary Rules
1. **`packages/ui` must NEVER contain business logic or API calls.** It only accepts Props and renders UI.
2. **`packages/schema` is the single source of truth.** Both frontend forms and Server Actions must validate against these Zod schemas.
3. **`packages/api-client` encapsulates all HTTP logic.** Do not use raw `fetch()` or `axios` inside page components.
4. **`apps/admin` orchestrates pages, Suspense boundaries, and Server Actions.**

---

## 2. SOLID Principles in Frontend Architecture

1. **Single Responsibility Principle (SRP):**
   - 1 component = 1 job. UI presentation is separated from data fetching.
   - Server components fetch data; client components manage interactivity.
2. **Open/Closed Principle (OCP):**
   - Components are extended via composition (`children`, slots, render props, and variant props).
   - Never modify an existing shared primitive to fit a one-off page need; extend via props.
3. **Liskov Substitution Principle (LSP):**
   - Custom UI components (`Button`, `Input`, `Select`) must honor standard HTML element attributes.
4. **Interface Segregation Principle (ISP):**
   - Components receive only the minimal props they actually need. Do not pass a monolithic 50-field entity to a simple badge.
5. **Dependency Inversion Principle (DIP):**
   - Data fetching depends on the abstract typed `apiClient` service, never on hardcoded fetch urls.

---

## 3. Reusable Component Protocol (`packages/ui`)

Before creating any UI element:
1. **Check First:** Does `@egp/ui` already have this component (e.g., `DataTable`, `Button`, `Modal`, `MoneyDisplay`)?
   - **YES:** Import and reuse it.
2. **Possibility of Reuse:** If building a new UI pattern that could be used in more than one place:
   - Create it inside `packages/ui/src/`.
   - Export it through `packages/ui/src/index.ts`.
   - Make it completely domain-agnostic (use generic types, e.g., `<T,>`).
3. **Domain-Specific Organisms:** Only page-specific layouts (e.g., `TenderExcelMatrix`) belong inside `apps/admin/components/`.

---

## 4. Data Fetching & Caching Standards

1. **No Axios:** Always use native Next.js extended `fetch`.
2. **RSC First ("You Might Not Need useEffect"):**
   - Fetch data inside React Server Components (`page.tsx`) using `await apiClient...`.
   - Zero client-side fetching cascades; zero layout shifts.
3. **PPR & Suspense Boundaries:**
   - Wrap dynamic data tables in `<Suspense fallback={<TableSkeleton />}>`.
4. **Tag-Based Cache Invalidation:**
   - Fetch calls declare cache tags: `{ next: { tags: ['tenders'] } }`.
   - Server Actions revalidate tags upon mutation: `revalidateTag('tenders')`.
   - Stale data is eliminated automatically without client cache synchronization hacks.
5. **URL SearchParams as State:**
   - Filters, search queries, and pagination state live in the URL (`?search=foo&page=2`).
   - Enables bookmarking, browser back-forward support, and server-side filtering.

---

## 5. Form Handling & Instant UX

1. **Client-Side Validation:** Use `react-hook-form` paired with `@hookform/resolvers/zod` and `@egp/schema`.
2. **Server Actions for Mutations:** Form submits call Next.js Server Actions with FormData or typed payload.
3. **Optimistic UI:** Use React 19 `useOptimistic` for instant feedback (e.g. recording payments reduces due balance immediately before server roundtrip finishes).

---

## 6. Mock Identity Bridge

- **Frontend:** `packages/api-client` automatically injects:
  `Authorization: Bearer mock-admin-token`
- **Backend:** .NET Backend reads this header and resolves:
  `UserId = "admin-guid-123"`
- When real JWT authentication is introduced later, only this interceptor and the backend middleware need modification.
