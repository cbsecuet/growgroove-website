interface ScheduleSectionProps {
  theme: {
    bg: string;
    text: string;
    accent: string;
    gradient: string;
    shadow: string;
  };
}

function ScheduleSection({ theme }: ScheduleSectionProps) {
  return (
    <div className={`bg-gradient-to-r ${theme.gradient} py-12 px-8`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center text-white items-center">
          <div>
            <h3 className="text-lg font-normal opacity-90">Experience</h3>
            <div className="text-4xl font-['Ranchers'] font-bold">
              10+ YEARS
            </div>
          </div>
          
          {/* Horizontal line separator */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-16 h-0.5 bg-white opacity-60"></div>
          </div>
          
          <div>
            <h3 className="text-lg font-normal opacity-90">Clients</h3>
            <div className="text-4xl font-['Ranchers'] font-bold">
              500+
            </div>
          </div>
          
          {/* Horizontal line separator */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-16 h-0.5 bg-white opacity-60"></div>
          </div>
          
          <div>
            <h3 className="text-lg font-normal opacity-90">Growth</h3>
            <div className="text-4xl font-['Ranchers'] font-bold">
              300%+
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleSection;
