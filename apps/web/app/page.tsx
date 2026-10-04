'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LeadModal } from '../components/LeadModal';
import {
  HeroSection,
  MetricsSection,
  WhyChooseSection,
  ServicesSection,
  ProjectCostSection,
  BusinessComplianceSection,
  ProcessSection,
  WhoWeServeSection,
  TestimonialsSection,
  FinalCTASection
} from '../components/sections';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState<string | undefined>();

  const openModalWithService = (serviceName?: string) => {
    setModalService(serviceName);
    setModalOpen(true);
  };

  return (
    <div className="page-wrapper">
      <Navbar onOpenModal={() => openModalWithService()} />

      <main>
        <HeroSection onOpenModal={openModalWithService} />
        <MetricsSection />
        <WhyChooseSection onOpenModal={openModalWithService} />
        <ServicesSection onOpenModal={openModalWithService} />
        <ProjectCostSection onOpenModal={openModalWithService} />
        <BusinessComplianceSection onOpenModal={openModalWithService} />
        <ProcessSection />
        <WhoWeServeSection />
        {/* <TestimonialsSection /> */}
        <FinalCTASection onOpenModal={openModalWithService} />
      </main>

      <Footer onOpenModal={() => openModalWithService()} />

      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={modalService}
      />
    </div>
  );
}
