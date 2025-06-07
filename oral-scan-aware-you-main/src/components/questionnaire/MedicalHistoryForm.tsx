
import { Control, UseFormWatch } from "react-hook-form";
import CurrentTreatmentSection from "./sections/CurrentTreatmentSection";
import MedicationsSection from "./sections/MedicationsSection";
import MedicalConditionsSection from "./sections/MedicalConditionsSection";
import LifestyleHabitsSection from "./sections/LifestyleHabitsSection";
import { QuestionnaireData } from "../PatientQuestionnaire";

interface MedicalHistoryFormProps {
  control: Control<QuestionnaireData>;
  watch: UseFormWatch<QuestionnaireData>;
}

const MedicalHistoryForm = ({ control, watch }: MedicalHistoryFormProps) => {
  return (
    <div className="space-y-6">
      <CurrentTreatmentSection control={control} watch={watch} />
      <MedicationsSection control={control} watch={watch} />
      <MedicalConditionsSection control={control} />
      <LifestyleHabitsSection control={control} watch={watch} />
    </div>
  );
};

export default MedicalHistoryForm;
