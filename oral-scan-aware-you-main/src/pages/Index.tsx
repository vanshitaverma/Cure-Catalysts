
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Camera, FileText, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  const handleStartAssessment = () => {
    console.log("Starting oral cancer risk assessment");
    navigate("/questionnaire");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Modern Clinical Header */}
      <header className="bg-primary shadow-sm border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground tracking-tight mb-2">
              Cure Catalyst
            </h1>
            <p className="text-lg text-primary-foreground/80 font-medium">
              Early detection. Better outcomes.
            </p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Advanced Oral Cancer
            <span className="text-primary block">Screening for Healthcare Providers</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Empower your clinical practice with AI-assisted oral cancer screening. 
            Streamlined patient assessment, photo analysis, and evidence-based risk evaluation in minutes.
          </p>

          <Button 
            onClick={handleStartAssessment}
            size="lg"
            className="text-lg px-8 py-6 mb-12"
          >
            Start Patient Assessment
          </Button>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-foreground">Clinical Questionnaire</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Structured patient interview covering symptoms, risk factors, and medical history
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-foreground">Clinical Photo Analysis</CardTitle>
                <CardDescription className="text-muted-foreground">
                  AI-powered visual assessment of oral cavity images for suspicious lesions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-foreground">Risk Stratification</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Evidence-based risk assessment with referral recommendations and follow-up guidance
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Benefits */}
          <div className="mt-16 bg-card rounded-lg p-8 border border-border shadow-sm">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Why Healthcare Providers Choose Our Screening Tool</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-muted-foreground">HIPAA-compliant patient data handling</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-muted-foreground">Evidence-based clinical algorithms</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-muted-foreground">Streamlined 5-10 minute assessments</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-muted-foreground">Developed with oncology specialists</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 p-6 bg-muted/30 border border-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Professional Use Only:</strong> This tool is designed as a clinical decision support system 
              for licensed healthcare providers. It supplements but does not replace clinical judgment, 
              physical examination, and standard diagnostic procedures.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
