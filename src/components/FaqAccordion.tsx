import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { FaqItem } from '../data/faq';
import { RevealSection } from './MotionPrimitives';

interface FaqAccordionProps {
  items: FaqItem[];
  defaultOpenId?: string | null;
}

export function FaqAccordion({ items, defaultOpenId = null }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;

        return (
          <RevealSection key={item.id} delay={Math.min(idx * 0.06, 0.36)} variant="up">
            <div
              className={`rounded-xl border transition-colors duration-200 bg-[#14141A] ${
                isOpen ? 'border-[#8B35FF]/60' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B35FF] rounded-xl"
              >
                <span className="font-sans text-sm sm:text-base font-semibold text-white leading-snug">
                  {item.question}
                </span>

                <span
                  aria-hidden="true"
                  className={`w-8 h-8 rounded-full shrink-0 inline-flex items-center justify-center border transition-all duration-300 ${
                    isOpen
                      ? 'bg-[#8B35FF] border-[#8B35FF] text-white rotate-45'
                      : 'bg-[#8B35FF]/15 border-[#8B35FF]/35 text-[#C89EFF] rotate-0'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 sm:px-6 pb-5 pt-0.5 text-sm sm:text-base text-[#A5A5B0] leading-relaxed border-t border-white/5">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </RevealSection>
        );
      })}
    </div>
  );
}
