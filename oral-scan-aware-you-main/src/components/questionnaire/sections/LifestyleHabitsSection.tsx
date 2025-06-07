
import { Control, UseFormWatch } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { QuestionnaireData } from "../../PatientQuestionnaire";

interface LifestyleHabitsSectionProps {
  control: Control<QuestionnaireData>;
  watch: UseFormWatch<QuestionnaireData>;
}

const LifestyleHabitsSection = ({ control, watch }: LifestyleHabitsSectionProps) => {
  return (
    <>
      {/* Smoking */}
      <FormField
        control={control}
        name="smokingStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Did you or do you smoke?</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="current" id="smoke-current" />
                  <label htmlFor="smoke-current">Yes, currently</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="former" id="smoke-former" />
                  <label htmlFor="smoke-former">Yes, in the past</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="smoke-never" />
                  <label htmlFor="smoke-never">Never</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {(watch("smokingStatus") === "current" || watch("smokingStatus") === "former") && (
        <>
          <FormField
            control={control}
            name="smokingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What do you smoke?</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select smoking type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cigarettes">Cigarettes</SelectItem>
                      <SelectItem value="bidis">Bidis</SelectItem>
                      <SelectItem value="chillum">Chillum</SelectItem>
                      <SelectItem value="hookah">Hookah</SelectItem>
                      <SelectItem value="cigars">Cigars</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="smokingFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How many times do you smoke normally?</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 10 cigarettes per day" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="smokingDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How long have you been smoking?</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 5 years" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </>
      )}

      {/* Smokeless Tobacco */}
      <FormField
        control={control}
        name="smokelessTobacco"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Did you or do you use smokeless tobacco?</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="current" id="smokeless-current" />
                  <label htmlFor="smokeless-current">Yes, currently</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="former" id="smokeless-former" />
                  <label htmlFor="smokeless-former">Yes, in the past</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="smokeless-never" />
                  <label htmlFor="smokeless-never">Never</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {(watch("smokelessTobacco") === "current" || watch("smokelessTobacco") === "former") && (
        <>
          <FormField
            control={control}
            name="smokelessTobaccoType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What do you chew?</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select smokeless tobacco type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gutkha">Gutkha</SelectItem>
                      <SelectItem value="khaini">Khaini</SelectItem>
                      <SelectItem value="zarda">Zarda</SelectItem>
                      <SelectItem value="mawa">Mawa</SelectItem>
                      <SelectItem value="gul">Gul</SelectItem>
                      <SelectItem value="pan-masala">Pan masala with tobacco</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="smokelessTobaccoFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How many times in a day?</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 5 times per day" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="smokelessTobaccoDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How long have you been using smokeless tobacco?</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 3 years" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </>
      )}

      {/* Alcohol */}
      <FormField
        control={control}
        name="alcoholConsumption"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Did you or do you take alcohol?</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="current" id="alcohol-current" />
                  <label htmlFor="alcohol-current">Yes, currently</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="former" id="alcohol-former" />
                  <label htmlFor="alcohol-former">Yes, in the past</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="alcohol-never" />
                  <label htmlFor="alcohol-never">Never</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {(watch("alcoholConsumption") === "current" || watch("alcoholConsumption") === "former") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="alcoholFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How often do you take alcohol?</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="occasionally">Occasionally</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="alcoholDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Since how many years?</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 10 years" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </>
  );
};

export default LifestyleHabitsSection;
