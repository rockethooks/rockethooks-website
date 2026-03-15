import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FormField } from './FormField';
import { Button } from '@components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { cn } from '@lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'sales', label: 'Sales & Pricing' },
  { value: 'enterprise', label: 'Enterprise Plans' },
  { value: 'support', label: 'Technical Support' },
  { value: 'partnership', label: 'Partnership' },
] as const;

function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormValues) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For now, log data and show success toast
    console.info('Contact form submitted:', data);
    toast.success('Message sent successfully', {
      description: 'We will get back to you within one business day.',
    });
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 space-y-6"
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          {...register('name')}
          label="Name"
          type="text"
          required
          minLength={2}
          autoComplete="name"
          placeholder="Your name"
          error={errors.name?.message}
        />
        <FormField
          {...register('email')}
          label="Email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          error={errors.email?.message}
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-foreground"
        >
          Subject
        </label>
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger
                id="subject"
                className={cn(
                  'w-full',
                  errors.subject &&
                    'border-destructive ring-destructive/20'
                )}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={
                  errors.subject ? 'subject-error' : undefined
                }
              >
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                {SUBJECT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.subject && (
          <p
            id="subject-error"
            className="text-xs text-destructive"
            role="alert"
          >
            {errors.subject.message}
          </p>
        )}
      </div>

      <FormField
        {...register('message')}
        as="textarea"
        label="Message"
        required
        minLength={10}
        placeholder="How can we help?"
        error={errors.message?.message}
      />

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}

export { ContactForm };
