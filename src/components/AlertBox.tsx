import { forwardRef, HTMLAttributes } from 'react';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

/* 
taken from shadcn/ui, ill use it for my alertbox component

*/

const alertVariants = cva(
  'absolute bottom-8 right-4 w-[400px] border p-2 text-left pl-5 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-[var(--destructive)] text-[var(--destructive-foreground)] [&>svg]:text-[var(--destructive)]',
        constructive:
          'border-[var(--constructive)] text-[var(--constructive-foreground)] [&>svg]:text-[var(--constructive)]'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

const Alert = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = 'Alert';

const AlertTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('mb-1 font-medium leading-none', className)} {...props} />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
  )
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };

export type AlertBoxVariants = 'default' | 'destructive' | 'constructive';

export type AlertBoxProps = {
  variant: AlertBoxVariants;
  title: string;
  message: string;
};

export const AlertBox = ({ variant, title, message }: AlertBoxProps) => (
  <Alert variant={variant} className="border-2   bg-[#f2f2f2f6]">
    <FontAwesomeIcon
      icon={faExclamationTriangle}
      className="absolute left-4 top-4 text-foreground"
    />
    <AlertTitle className="font-bold">{title}</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);
