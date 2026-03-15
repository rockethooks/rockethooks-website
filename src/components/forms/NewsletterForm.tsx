import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  className?: string;
}

function NewsletterForm({ className }: NewsletterFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(data: NewsletterFormValues) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.info('Newsletter signup:', data);
    toast.success('You are subscribed!', {
      description: 'Check your inbox for a confirmation email.',
    });
    reset();
  }

  const emailError = errors.email?.message;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-2 sm:flex-row sm:items-start', className)}
      noValidate
    >
      <div className="flex-1 space-y-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          {...register('email')}
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? 'newsletter-email-error' : undefined}
          className={cn(
            'h-9',
            emailError && 'border-destructive ring-destructive/20'
          )}
        />
        {emailError && (
          <p
            id="newsletter-email-error"
            className="text-xs text-destructive"
            role="alert"
          >
            {emailError}
          </p>
        )}
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting} className="shrink-0">
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  );
}

export { NewsletterForm };
