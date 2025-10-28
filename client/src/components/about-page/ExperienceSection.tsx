import BadgePill from '../ui/badge-pill';

interface ExperienceSectionProps {
  theme: {
    bg: string;
    text: string;
    accent: string;
    gradient: string;
    shadow: string;
  };
}

function ExperienceSection({ theme }: ExperienceSectionProps) {
  return (
    <div className="h-full flex flex-col justify-center max-w-5xl mx-auto py-16 px-8">
      <div className="text-center mb-16">
        <BadgePill theme={theme} emoji="🎯" text="SERVICES" />
        <h2 className={`text-[64px] font-['Ranchers'] font-normal leading-none mb-8 ${theme.text}`}>
          SOCIAL MEDIA,<br />
          CONTENT, AND STRATEGY
        </h2>
        <p className={`text-xl ${theme.text} mb-12 leading-relaxed max-w-3xl mx-auto`}>
          Creative campaigns, engaging content, and data-driven strategies to elevate your brand.
        </p>
      </div>

      <div className="flex justify-center items-center gap-8 mb-16">
        <div className={`${theme.bg} rounded-3xl p-8 text-white text-center transform -rotate-6 shadow-2xl w-80`}>
          <div className="text-6xl mb-4">📱</div>
          <h3 className="text-3xl font-['Ranchers'] font-bold mb-4">SOCIAL MEDIA</h3>
          <p className="text-lg opacity-90">ENGAGING SOCIAL CAMPAIGNS</p>
        </div>
        
        <div className={`${theme.bg} rounded-3xl p-8 text-white text-center transform rotate-2 shadow-2xl w-80`}>
          <div className="text-6xl mb-4">✍️</div>
          <h3 className="text-3xl font-['Ranchers'] font-bold mb-4">CONTENT</h3>
          <p className="text-lg opacity-90">CREATIVE CONTENT CREATION</p>
        </div>
        
        <div className={`${theme.bg} rounded-3xl p-8 text-white text-center transform -rotate-3 shadow-2xl w-80`}>
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-3xl font-['Ranchers'] font-bold mb-4">STRATEGY</h3>
          <p className="text-lg opacity-90">DATA-DRIVEN MARKETING</p>
        </div>
      </div>
    </div>
  );
}

export default ExperienceSection;

