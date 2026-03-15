import * as React from 'react';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { cn } from '@lib/utils';

interface FormFieldProps extends React.ComponentProps<'input'> {
  name: string;
  label: string;
  error?: string;
  as?: 'input' | 'textarea';
}

const FormField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(({ name, label, error, as = 'input', className, ...props }, ref) => {
  const id = props.id ?? name;
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  return (
    <div className={cn('space-y-1.5', className)}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>

      {as === 'textarea' ? (
        <Textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          id={id}
          name={name}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={cn(
            hasError && 'border-destructive ring-destructive/20'
          )}
          {...(props as React.ComponentProps<'textarea'>)}
        />
      ) : (
        <Input
          ref={ref as React.Ref<HTMLInputElement>}
          id={id}
          name={name}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={cn(
            hasError && 'border-destructive ring-destructive/20'
          )}
          {...props}
        />
      )}

      {hasError && (
        <p id={errorId} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

export { FormField };
export type { FormFieldProps };
