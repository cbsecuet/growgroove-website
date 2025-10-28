import { useState } from 'react';
import BadgePill from '../components/ui/badge-pill';

interface ServicePackage {
  id: number;
  name: string;
  description: string;
  features: string[];
  price: string;
}

interface AgendaContentProps {
  theme: {
    bg: string;
    text: string;
    accent: string;
    gradient: string;
    shadow: string;
  };
}

function AgendaContent({ theme }: AgendaContentProps) {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const servicePackages: ServicePackage[] = [
    {
      id: 1,
      name: "STARTER",
      description: "Perfect for new brands",
      features: [
        "Social Media Strategy",
        "2 Platforms Management",
        "4 Posts Per Week",
        "Basic Analytics",
        "Monthly Report"
      ],
      price: "$499/mo"
    },
    {
      id: 2,
      name: "GROWTH",
      description: "For scaling businesses",
      features: [
        "Full Social Strategy",
        "4 Platforms Management",
        "Daily Content Posting",
        "Content Creation (Photos/Videos)",
        "Engagement Management",
        "Weekly Analytics",
        "Paid Ads Management"
      ],
      price: "$999/mo"
    },
    {
      id: 3,
      name: "ENTERPRISE",
      description: "Complete digital transformation",
      features: [
        "Dedicated Account Manager",
        "All Platforms Management",
        "Custom Content Calendar",
        "Professional Video Production",
        "Influencer Partnerships",
        "SEO Optimization",
        "Real-time Analytics Dashboard",
        "Quarterly Strategy Reviews"
      ],
      price: "Custom"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="h-screen flex flex-col justify-center max-w-5xl mx-auto text-center w-full px-8">
        <div className="mb-12 relative">
          <BadgePill theme={theme} emoji="📦" text="PACKAGES" />
          <h1 className={`text-[64px] font-['Ranchers'] font-normal leading-none mb-8 ${theme.text}`}>
            CHOOSE YOUR<br />
            GROWTH PACKAGE
          </h1>
          <p className={`text-xl ${theme.text} mb-12 leading-relaxed`}>
            Flexible plans designed to fit your budget and business goals
          </p>
        </div>
      </div>

      {/* Service Packages */}
      <div className="max-w-6xl mx-auto py-16 px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicePackages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-8 text-white text-center transform transition-all duration-300 cursor-pointer ${
                selectedPackage === pkg.id ? 'scale-105 shadow-2xl' : 'hover:scale-102'
              } ${theme.bg} shadow-lg`}
              style={{
                transform: `${index === 0 ? 'rotate(-3deg)' : index === 2 ? 'rotate(3deg)' : 'rotate(0deg)'} ${
                  selectedPackage === pkg.id ? 'scale(1.05)' : 'scale(1)'
                }`
              }}
              onClick={() => setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)}
            >
              <h3 className="text-4xl font-['Ranchers'] font-bold mb-2">{pkg.name}</h3>
              <p className="text-lg opacity-80 mb-6">{pkg.description}</p>
              <div className="text-3xl font-['Ranchers'] font-bold mb-8">{pkg.price}</div>

              {/* Features List */}
              <div className={`transition-all duration-300 overflow-hidden ${
                selectedPackage === pkg.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <ul className="text-left space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="text-xl">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-white text-gray-800 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                  GET STARTED
                </button>
              </div>

              {selectedPackage !== pkg.id && (
                <button className="w-full bg-white bg-opacity-20 text-white font-bold py-3 rounded-xl hover:bg-opacity-30 transition-all">
                  LEARN MORE
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Growgroove */}
      <div className="max-w-5xl mx-auto py-16 px-8 w-full">
        <div className="text-center mb-12">
          <BadgePill theme={theme} emoji="⭐" text="WHY GROWGROOVE" />
          <h2 className={`text-5xl md:text-6xl font-['Ranchers'] ${theme.text} mb-8`}>
            WHAT SETS US APART
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`${theme.bg} rounded-3xl p-8 text-white`}>
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-['Ranchers'] font-bold mb-4">Data-Driven Results</h3>
            <p className="opacity-90">Every strategy backed by analytics and real metrics to ensure ROI</p>
          </div>

          <div className={`${theme.bg} rounded-3xl p-8 text-white`}>
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-2xl font-['Ranchers'] font-bold mb-4">Expert Team</h3>
            <p className="opacity-90">Certified specialists in social media, content, and digital marketing</p>
          </div>

          <div className={`${theme.bg} rounded-3xl p-8 text-white`}>
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-['Ranchers'] font-bold mb-4">Fast Turnaround</h3>
            <p className="opacity-90">Quick delivery without compromising on quality or creativity</p>
          </div>

          <div className={`${theme.bg} rounded-3xl p-8 text-white`}>
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-2xl font-['Ranchers'] font-bold mb-4">Dedicated Support</h3>
            <p className="opacity-90">Your success is our priority with responsive 24/7 support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgendaContent;
