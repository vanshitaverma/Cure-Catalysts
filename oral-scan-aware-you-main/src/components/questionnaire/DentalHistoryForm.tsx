
import { Control, UseFormWatch } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { QuestionnaireData } from "../PatientQuestionnaire";

interface DentalHistoryFormProps {
  control: Control<QuestionnaireData>;
  watch: UseFormWatch<QuestionnaireData>;
}

const DentalHistoryForm = ({ control, watch }: DentalHistoryFormProps) => {
  const mouthProblems = watch("mouthProblems");
  const oralSymptoms = watch("oralSymptoms");

  const symptomOptions = [
    "Pain on swallowing",
    "Mouth ulcer", 
    "Sore throat",
    "Persistent hoarseness",
    "Lump/swelling in the mouth or neck",
    "Bleeding in the mouth",
    "White patch",
    "Red patch",
    "Burning sensation in the mouth",
    "Difficulty opening the mouth"
  ];

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="lastDentistVisit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>1. When was your last visit to the dentist?</FormLabel>
            <FormControl>
              <Input placeholder="Enter date or time period" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="mouthProblems"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>2. Have you suffered from any mouth or tooth problems in the last one year?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="mouth-problems-yes" />
                  <label htmlFor="mouth-problems-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="mouth-problems-no" />
                  <label htmlFor="mouth-problems-no">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {mouthProblems === "yes" && (
        <FormField
          control={control}
          name="mouthProblemsDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>If yes, what were or was the problem?</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the mouth or tooth problems" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={control}
        name="whoConsulted"
        render={({ field }) => (
          <FormItem>
            <FormLabel>3. Who was or were consulted?</FormLabel>
            <FormControl>
              <Input placeholder="Enter healthcare provider(s) consulted" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="oralSymptoms"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base font-medium">4. Have you noticed any of the following?</FormLabel>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {symptomOptions.map((symptom) => (
                <FormField
                  key={symptom}
                  control={control}
                  name="oralSymptoms"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={symptom}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(symptom)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), symptom])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== symptom
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {symptom}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DentalHistoryForm;
