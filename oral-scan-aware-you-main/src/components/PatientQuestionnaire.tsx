import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import QuestionnaireHeader from "./questionnaire/QuestionnaireHeader";
import ProgressIndicator from "./questionnaire/ProgressIndicator";
import PatientInformationForm from "./questionnaire/PatientInformationForm";
import MedicalHistoryForm from "./questionnaire/MedicalHistoryForm";
import DentalHistoryForm from "./questionnaire/DentalHistoryForm";
import ClinicalExaminationForm from "./questionnaire/ClinicalExaminationForm";
import NavigationButtons from "./questionnaire/NavigationButtons";
import ImageAnalysis from "./ImageAnalysis";

export interface QuestionnaireData {
  // First page
  name: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  address: string;
  contactNumber: string;
  
  // Second page - Medical History
  currentTreatment: string;
  currentTreatmentDetails: string;
  healthChanges: string;
  healthChangesDetails: string;
  medications: string;
  medicationsDetails: string;
  medicalConditions: string[];
  familyDiseases: string;
  smokingStatus: string;
  smokingType: string;
  smokingFrequency: string;
  smokingDuration: string;
  smokelessTobacco: string;
  smokelessTobaccoType: string;
  smokelessTobaccoFrequency: string;
  smokelessTobaccoDuration: string;
  alcoholConsumption: string;
  alcoholFrequency: string;
  alcoholDuration: string;

  // Third page - Dental History
  lastDentistVisit: string;
  mouthProblems: string;
  mouthProblemsDetails: string;
  whoConsulted: string;
  oralSymptoms: string[];

  // Fourth page - Clinical Examination
  generalAppearance: string;
  generalAppearanceNotes: string;
  lymphNodes: string;
  facialAsymmetry: string;
  oralHygiene: string;
  suspiciousLesions: boolean;
  lesionLocation: string;
  tongueExamination: string;
  floorOfMouth: string;
  buccalMucosa: string;
  gingivae: string;
  riskLevel: string;
  clinicalNotes: string;
  followUpRequired: boolean;
  referralRequired: boolean;
  
  // Detailed lesion assessment
  lesionPresent: string;
  lesionLocationDetails: string[];
  lesionColor: string;
  lesionSize: string;
  lesionShape: string;
  lesionDistribution: string;
  lesionDefinition: string;
  lesionClassification: string;
  participantId: string;
}

const PatientQuestionnaire = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showImageAnalysis, setShowImageAnalysis] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<QuestionnaireData>({
    defaultValues: {
      name: "",
      dateOfBirth: "",
      age: "",
      gender: "",
      address: "",
      contactNumber: "",
      currentTreatment: "",
      currentTreatmentDetails: "",
      healthChanges: "",
      healthChangesDetails: "",
      medications: "",
      medicationsDetails: "",
      medicalConditions: [],
      familyDiseases: "",
      smokingStatus: "",
      smokingType: "",
      smokingFrequency: "",
      smokingDuration: "",
      smokelessTobacco: "",
      smokelessTobaccoType: "",
      smokelessTobaccoFrequency: "",
      smokelessTobaccoDuration: "",
      alcoholConsumption: "",
      alcoholFrequency: "",
      alcoholDuration: "",
      lastDentistVisit: "",
      mouthProblems: "",
      mouthProblemsDetails: "",
      whoConsulted: "",
      oralSymptoms: [],
      generalAppearance: "",
      generalAppearanceNotes: "",
      lymphNodes: "",
      facialAsymmetry: "",
      oralHygiene: "",
      suspiciousLesions: false,
      lesionLocation: "",
      tongueExamination: "",
      floorOfMouth: "",
      buccalMucosa: "",
      gingivae: "",
      riskLevel: "",
      clinicalNotes: "",
      followUpRequired: false,
      referralRequired: false,
      
      // New detailed lesion assessment defaults
      lesionPresent: "",
      lesionLocationDetails: [],
      lesionColor: "",
      lesionSize: "",
      lesionShape: "",
      lesionDistribution: "",
      lesionDefinition: "",
      lesionClassification: "",
      participantId: "",
    },
  });

  const sections = [
    {
      title: "Patient Information",
      description: "Basic patient details"
    },
    {
      title: "Medical History",
      description: "Medical background and lifestyle habits"
    },
    {
      title: "Dental History",
      description: "Dental background and oral health symptoms"
    },
    {
      title: "Clinical Examination",
      description: "Healthcare worker observations during oral cancer screening"
    }
  ];

  const onSubmit = (data: QuestionnaireData) => {
    console.log("Questionnaire completed:", data);
    setShowImageAnalysis(true);
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0: 
        return <PatientInformationForm control={form.control} />;
      case 1: 
        return <MedicalHistoryForm control={form.control} watch={form.watch} />;
      case 2:
        return <DentalHistoryForm control={form.control} watch={form.watch} />;
      case 3:
        return <ClinicalExaminationForm control={form.control} watch={form.watch} />;
      default: 
        return null;
    }
  };

  if (showImageAnalysis) {
    return <ImageAnalysis onBack={() => setShowImageAnalysis(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <QuestionnaireHeader onNavigateHome={() => navigate("/")} />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <ProgressIndicator 
            currentSection={currentSection}
            totalSections={sections.length}
          />

          <Card>
            <QuestionnaireHeader 
              title={sections[currentSection].title}
              description={sections[currentSection].description}
              onNavigateHome={() => navigate("/")}
              showBackButton
            />
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {renderCurrentSection()}
                  
                  <NavigationButtons
                    currentSection={currentSection}
                    totalSections={sections.length}
                    onPrevious={prevSection}
                    onNext={nextSection}
                    onSubmit={form.handleSubmit(onSubmit)}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PatientQuestionnaire;
