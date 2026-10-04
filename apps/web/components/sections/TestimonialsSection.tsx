import React from 'react';

export function TestimonialsSection() {
  return (
    <section className="testimonials-section section-padding">
      <div className="container text-center">
        <div className="eyebrow-pill margin-center">
          <span>TESTIMONIALS</span>
        </div>

        <h2 className="section-title-large">
          What Our Clients Say
        </h2>

        <p className="section-subtext-regular margin-center max-w-500">
          Trusted by businesses and organizations across Bangladesh.
        </p>

        <div className="testimonials-cards-grid">
          {/* Testimonial 1 */}
          <div className="testimonial-quote-card">
            <div className="quote-mark-icon">“</div>
            <p className="testimonial-text">
              &ldquo;e-GP Tender BD made our tender submission process so much easier. Their team is professional, responsive and very knowledgeable.&rdquo;
            </p>
            <div className="testimonial-author-row">
              <div className="author-avatar-circle">
                <span>RI</span>
              </div>
              <div className="author-meta">
                <h4 className="author-name">Rafiqul Islam</h4>
                <span className="author-role">Managing Director, Sunrise Ltd.</span>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="testimonial-quote-card">
            <div className="quote-mark-icon">“</div>
            <p className="testimonial-text">
              &ldquo;Their support is outstanding. We got our tender submitted on time and with zero hassle.&rdquo;
            </p>
            <div className="testimonial-author-row">
              <div className="author-avatar-circle">
                <span>NJ</span>
              </div>
              <div className="author-meta">
                <h4 className="author-name">Nusrat Jahan</h4>
                <span className="author-role">CEO, BrightVision Ltd.</span>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="testimonial-quote-card">
            <div className="quote-mark-icon">“</div>
            <p className="testimonial-text">
              &ldquo;Highly recommended for anyone looking for reliable e-GP consultancy and submission support. Very professional team!&rdquo;
            </p>
            <div className="testimonial-author-row">
              <div className="author-avatar-circle">
                <span>MA</span>
              </div>
              <div className="author-meta">
                <h4 className="author-name">Md. Ariful Hasan</h4>
                <span className="author-role">Director, Al-Amin Group</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination indicator dots */}
        <div className="testimonial-dots-row">
          <span className="carousel-dot"></span>
          <span className="carousel-dot active"></span>
          <span className="carousel-dot"></span>
          <span className="carousel-dot"></span>
        </div>
      </div>
    </section>
  );
}
