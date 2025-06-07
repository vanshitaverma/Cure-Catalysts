
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { QuestionnaireData } from "../../PatientQuestionnaire";

interface MedicalConditionsSectionProps {
  control: Control<QuestionnaireData>;
}

const MedicalConditionsSection = ({ control }: MedicalConditionsSectionProps) => {
  return (
    <>
      <FormField
        control={control}
        name="medicalConditions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Do you have or ever had any of the following conditions? (Select all that apply)</FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 gap-4">
                {["Asthma", "High blood pressure", "Heart disease", "Diabetes", "Stroke", "Bleeding disorder", "Cancer", "None of the above"].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={condition}
                      checked={field.value?.includes(condition) || false}
                      onChange={(e) => {
                        const updatedConditions = e.target.checked
                          ? [...(field.value || []), condition]
                          : (field.value || []).filter((c) => c !== condition);
                        field.onChange(updatedConditions);
                      }}
                    />
                    <label htmlFor={condition} className="text-sm">{condition}</label>
                  </div>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="familyDiseases"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Are there any diseases that run in your family?</FormLabel>
            <FormControl>
              <Textarea placeholder="e.g., diabetes, cancer, heart disease" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default MedicalConditionsSection;
