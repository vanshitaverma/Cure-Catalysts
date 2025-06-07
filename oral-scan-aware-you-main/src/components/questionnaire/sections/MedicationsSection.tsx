
import { Control, UseFormWatch } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { QuestionnaireData } from "../../PatientQuestionnaire";

interface MedicationsSectionProps {
  control: Control<QuestionnaireData>;
  watch: UseFormWatch<QuestionnaireData>;
}

const MedicationsSection = ({ control, watch }: MedicationsSectionProps) => {
  return (
    <>
      <FormField
        control={control}
        name="medications"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Are you taking any medications?</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="meds-yes" />
                  <label htmlFor="meds-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="meds-no" />
                  <label htmlFor="meds-no">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {watch("medications") === "yes" && (
        <FormField
          control={control}
          name="medicationsDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What medications and for how long?</FormLabel>
              <FormControl>
                <Textarea placeholder="List medications, what they're for, and duration" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default MedicationsSection;
