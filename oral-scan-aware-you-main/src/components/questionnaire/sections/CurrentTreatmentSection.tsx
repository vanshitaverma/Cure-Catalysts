
import { Control, UseFormWatch } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { QuestionnaireData } from "../../PatientQuestionnaire";

interface CurrentTreatmentSectionProps {
  control: Control<QuestionnaireData>;
  watch: UseFormWatch<QuestionnaireData>;
}

const CurrentTreatmentSection = ({ control, watch }: CurrentTreatmentSectionProps) => {
  return (
    <>
      <FormField
        control={control}
        name="currentTreatment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Are you being treated for any medical condition at present or have been in the past year?</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="treatment-yes" />
                  <label htmlFor="treatment-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="treatment-no" />
                  <label htmlFor="treatment-no">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {watch("currentTreatment") === "yes" && (
        <FormField
          control={control}
          name="currentTreatmentDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>If yes, why?</FormLabel>
              <FormControl>
                <Textarea placeholder="Please explain the medical condition and treatment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={control}
        name="healthChanges"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Has there been any change in your general health in the past year?</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="health-yes" />
                  <label htmlFor="health-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="health-no" />
                  <label htmlFor="health-no">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {watch("healthChanges") === "yes" && (
        <FormField
          control={control}
          name="healthChangesDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please explain the changes</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the changes in your health" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default CurrentTreatmentSection;
