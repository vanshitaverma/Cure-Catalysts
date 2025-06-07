
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface QuestionnaireHeaderProps {
  title?: string;
  description?: string;
  onNavigateHome: () => void;
  showBackButton?: boolean;
}

const QuestionnaireHeader = ({ 
  title, 
  description, 
  onNavigateHome, 
  showBackButton = false 
}: QuestionnaireHeaderProps) => {
  if (!showBackButton) {
    return (
      <header className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Cure Catalyst</h1>
          <div className="text-sm text-muted-foreground">
            Patient Assessment Questionnaire
          </div>
        </div>
      </header>
    );
  }

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Button
          variant="outline"
          onClick={onNavigateHome}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </div>
    </CardHeader>
  );
};

export default QuestionnaireHeader;
