import { Button } from '../ui/button';
import BadgePill from '../ui/badge-pill';

interface PricingSectionProps {
  theme: {
    bg: string;
    text: string;
    accent: string;
    gradient: string;
    shadow: string;
  };
}

function PricingSection({ theme }: PricingSectionProps) {
  return (
    <div className="h-full flex flex-col justify-center max-w-5xl mx-auto py-16 px-8">
      <div className="text-center mb-16">
        <BadgePill theme={theme} emoji="✉️" text="GET IN TOUCH" />
        <h2 className={`text-[64px] font-['Ranchers'] font-normal leading-none mb-8 ${theme.text}`}>
          READY TO<br />
          START GROWING?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Free Consultation Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-300 hover:scale-105 transform border-4 border-gray-100 relative flex flex-col">
          <h3 className="text-4xl font-['Ranchers'] text-gray-800 mb-6">📋 Free Consultation</h3>
          <div className={`text-7xl font-['Ranchers'] ${theme.text} mb-6`}>$0</div>
          <ul className="space-y-4 text-gray-700 mb-8 text-lg flex-grow">
            <li className="flex items-center gap-3">📊 Brand audit & analysis</li>
            <li className="flex items-center gap-3">🎯 Strategy recommendations</li>
            <li className="flex items-center gap-3">💡 Custom action plan</li>
            <li className="flex items-center gap-3">⏱️ 60-minute session</li>
          </ul>
          <Button className={`w-full ${theme.bg} hover:scale-105 transform transition-all duration-300 text-white py-4 rounded-2xl font-bold text-xl shadow-lg mt-auto`}>
            📅 Book Now
          </Button>
        </div>

        {/* Premium Package Card */}
        <div className={`bg-white rounded-3xl shadow-2xl p-10 border-4 border-gray-100 hover:shadow-3xl transition-all duration-300 hover:scale-105 transform relative overflow-hidden flex flex-col`}>
          <div className="absolute top-4 right-4">
            <span className={`${theme.bg} text-white px-4 py-2 rounded-full text-sm font-bold`}>
              🔥 POPULAR
            </span>
          </div>
          
          <h3 className="text-4xl font-['Ranchers'] text-gray-800 mb-6">🚀 Premium Package</h3>
          <div className={`text-7xl font-['Ranchers'] ${theme.text} mb-6`}>$999</div>
          <ul className="space-y-4 text-gray-700 mb-8 text-lg flex-grow">
            <li className="flex items-center gap-3">✅ Everything in Starter</li>
            <li className="flex items-center gap-3">📱 4 Platform Management</li>
            <li className="flex items-center gap-3">🎬 Professional video content</li>
            <li className="flex items-center gap-3">📊 Advanced analytics</li>
            <li className="flex items-center gap-3">⚡ Priority support</li>
            <li className="flex items-center gap-3">🎁 Free strategy review</li>
          </ul>
          <Button className={`w-full ${theme.bg} hover:scale-105 transform transition-all duration-300 text-white py-4 rounded-2xl font-bold text-xl shadow-lg mt-auto`}>
            🚀 Get Started
          </Button>
        </div>
      </div>

      {/* Contact Info */}
      <div className={`bg-gradient-to-r ${theme.gradient} rounded-3xl p-12 text-white text-center`}>
        <h3 className="text-3xl font-['Ranchers'] font-bold mb-6">DIRECT CONTACT</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl mb-2">📧</div>
            <p className="font-bold">Email</p>
            <p className="opacity-90">hello@growgroove.com</p>
          </div>
          <div>
            <div className="text-4xl mb-2">📱</div>
            <p className="font-bold">Phone</p>
            <p className="opacity-90">+1 (555) 123-4567</p>
          </div>
          <div>
            <div className="text-4xl mb-2">💬</div>
            <p className="font-bold">Social</p>
            <p className="opacity-90">@growgroove</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingSection;
