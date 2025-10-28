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
        <BadgePill theme={theme} emoji="📱" text="ABOUT" />
        <h1 className={`text-[64px] font-['Ranchers'] font-normal leading-none mb-8 ${theme.text}`}>
          GROW YOUR BRAND WITH<br />
          GROWGROOVE'S DIGITAL<br />
          MARKETING EXPERTISE
        </h1>
      </div>

      <div className="flex justify-center items-center">
        <div className="relative w-96 h-64">
          {/* First Image */}
          <div className="absolute bg-white p-3 shadow-xl transform rotate-12">
            <img 
              src="/placeholder.webp" 
              alt="Social media marketing" 
              className="w-48 h-32 object-cover rounded-sm"
            />
          </div>
          
          {/* Second Image */}
          <div className="absolute bg-white p-3 shadow-xl transform -rotate-6 -top-4 left-16">
            <img 
              src="/placeholder.webp" 
              alt="Content creation" 
              className="w-48 h-32 object-cover rounded-sm"
            />
          </div>
          
          {/* Third Image */}
          <div className="absolute bg-white p-3 shadow-xl transform rotate-3 -top-8 left-32">
            <img 
              src="/placeholder.webp" 
              alt="Digital strategy" 
              className="w-48 h-32 object-cover rounded-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;

