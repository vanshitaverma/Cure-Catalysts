
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationButtonsProps {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const NavigationButtons = ({ 
  currentSection, 
  totalSections, 
  onPrevious, 
  onNext, 
  onSubmit 
}: NavigationButtonsProps) => {
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    onNext();
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    onPrevious();
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="flex justify-between pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={handlePrevious}
        disabled={currentSection === 0}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Previous
      </Button>
      
      {currentSection < totalSections - 1 ? (
        <Button
          type="button"
          onClick={handleNext}
          className="flex items-center gap-2"
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          type="button"
          onClick={handleSubmit}
          className="flex items-center gap-2"
        >
          Complete Assessment
          <ArrowRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
