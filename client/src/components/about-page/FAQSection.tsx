import { useState } from 'react';
import BadgePill from '../ui/badge-pill';

interface FAQSectionProps {
  theme: {
    bg: string;
    text: string;
    accent: string;
    gradient: string;
    shadow: string;
  };
}

function FAQSection({ theme }: FAQSectionProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqData = [
    {
      id: 1,
      question: "What digital marketing services does Growgroove offer?",
      answer: "We specialize in social media marketing, content creation, SEO optimization, paid advertising, brand strategy, and analytics. Our team creates comprehensive digital campaigns tailored to your business goals."
    },
    {
      id: 2,
      question: "How long does it take to see results?",
      answer: "Results vary by service. Social media engagement can show improvements within 4-6 weeks, while SEO typically takes 3-6 months. We provide regular reports to track progress and ROI."
    },
    {
      id: 3,
      question: "Do you work with small businesses?",
      answer: "Absolutely! We work with businesses of all sizes, from startups to established brands. We customize our services to fit your budget and growth stage."
    },
    {
      id: 4,
      question: "What platforms do you specialize in?",
      answer: "We create content and manage campaigns across Instagram, TikTok, Facebook, LinkedIn, YouTube, and Twitter. We also optimize your website and email marketing strategies."
    },
    {
      id: 5,
      question: "Can you help with content creation?",
      answer: "Yes! Our creative team produces high-quality photos, videos, graphics, and copy. We handle everything from concept to final delivery, ensuring brand consistency."
    },
    {
      id: 6,
      question: "How do you measure marketing success?",
      answer: "We track KPIs like engagement rates, conversion rates, ROI, reach, and follower growth. Monthly reports show exactly how your investment is performing."
    },
    {
      id: 7,
      question: "Do you offer ongoing support?",
      answer: "Yes! We offer flexible packages from one-time campaigns to ongoing monthly management. You'll have a dedicated account manager for your business."
    },
    {
      id: 8,
      question: "How do I get started with Growgroove?",
      answer: "Simply reach out for a free consultation. We'll discuss your goals, analyze your current presence, and create a customized strategy that fits your needs and budget."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-8">
      <div className="text-center mb-12">
        <BadgePill theme={theme} emoji="❓" text="FAQ" />
        <h2 className={`text-5xl md:text-6xl font-['Ranchers'] ${theme.text} mb-8 drop-shadow-lg`}>
          KNOW BEFORE<br />
          YOU GROW
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 auto-rows-min">
        {faqData.map((faq) => (
          <div 
            key={faq.id}
            className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            style={{ alignSelf: 'start' }}
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className={`w-full p-6 text-left flex justify-between items-center ${theme.bg} text-white hover:opacity-90 transition-opacity duration-200`}
            >
              <h3 className="text-lg md:text-xl font-bold pr-4">{faq.question}</h3>
              <div className={`text-2xl transform transition-transform duration-300 flex-shrink-0 ${openFAQ === faq.id ? 'rotate-45' : ''}`}>
                {openFAQ === faq.id ? '×' : '+'}
              </div>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 bg-white">
                <p className="text-gray-700 text-lg leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQSection;
