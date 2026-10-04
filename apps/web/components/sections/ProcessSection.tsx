import React from 'react';
import { ArrowRight } from 'lucide-react';

export function ProcessSection() {
  return (
    <section className="process-clean-section section-padding" id="process">
      <div className="container text-center">
        <div className="eyebrow-pill margin-center">
          <span>OUR PROCESS</span>
        </div>

        <h2 className="section-title-large">
          A Simple 4-Step Process
        </h2>

        <p className="section-subtext-regular margin-center max-w-500">
          We make the tender process easy, transparent and stress-free.
        </p>

        <div className="process-steps-row">
          {/* Step 1 */}
          <div className="process-step-col">
            <div className="process-step-circle">01</div>
            <h3 className="process-step-title">Consultation</h3>
            <p className="process-step-desc">
              Understand your needs and assess opportunities.
            </p>
          </div>

          <div className="process-step-arrow">
            <ArrowRight size={20} />
          </div>

          {/* Step 2 */}
          <div className="process-step-col">
            <div className="process-step-circle">02</div>
            <h3 className="process-step-title">Preparation</h3>
            <p className="process-step-desc">
              Collect, organize and prepare all documents.
            </p>
          </div>

          <div className="process-step-arrow">
            <ArrowRight size={20} />
          </div>

          {/* Step 3 */}
          <div className="process-step-col">
            <div className="process-step-circle">03</div>
            <h3 className="process-step-title">Submission</h3>
            <p className="process-step-desc">
              Submit through e-GP with accuracy and compliance.
            </p>
          </div>

          <div className="process-step-arrow">
            <ArrowRight size={20} />
          </div>

          {/* Step 4 */}
          <div className="process-step-col">
            <div className="process-step-circle">04</div>
            <h3 className="process-step-title">Follow Up</h3>
            <p className="process-step-desc">
              Track status and support till final result.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
