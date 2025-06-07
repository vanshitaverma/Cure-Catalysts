
interface ProgressIndicatorProps {
  currentSection: number;
  totalSections: number;
}

const ProgressIndicator = ({ currentSection, totalSections }: ProgressIndicatorProps) => {
  const progressPercentage = Math.round(((currentSection + 1) / totalSections) * 100);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
        <span>Section {currentSection + 1} of {totalSections}</span>
        <span>{progressPercentage}% Complete</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
