import BadgePill from '../ui/badge-pill';

interface HeroSectionProps {
  theme: {
    bg: string;
    text: string;
    accent: string;
    gradient: string;
    shadow: string;
  };
}

function HeroSection({ theme }: HeroSectionProps) {
  return (
    <div className="h-screen flex flex-col justify-center max-w-5xl mx-auto text-center">
      <div className="mb-12 relative">
        <BadgePill theme={theme} emoji="📞" text="CONTACT" />
        <h1 className={`text-[64px] font-['Ranchers'] font-normal leading-none mb-8 ${theme.text}`}>
          LET'S GROW<br />
          YOUR BRAND<br />
          TOGETHER
        </h1>
        <p className={`text-xl ${theme.text} mb-12 leading-relaxed max-w-3xl mx-auto`}>
          Ready to transform your digital presence? Get a free consultation with our team today!
        </p>
      </div>

      <div className="flex justify-center items-center">
        <div className="relative w-96 h-64">
          {/* First Image */}
          <div className="absolute bg-white p-3 shadow-xl transform rotate-12">
            <img 
              src="/placeholder.webp" 
              alt="Team collaboration" 
              className="w-48 h-32 object-cover rounded-sm"
            />
          </div>
          
          {/* Second Image */}
          <div className="absolute bg-white p-3 shadow-xl transform -rotate-6 -top-4 left-16">
            <img 
              src="/placeholder.webp" 
              alt="Strategy session" 
              className="w-48 h-32 object-cover rounded-sm"
            />
          </div>
          
          {/* Third Image */}
          <div className="absolute bg-white p-3 shadow-xl transform rotate-3 -top-8 left-32">
            <img 
              src="/placeholder.webp" 
              alt="Success celebration" 
              className="w-48 h-32 object-cover rounded-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
