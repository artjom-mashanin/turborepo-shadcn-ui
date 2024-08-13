import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils/tw.utils';

const textVariants = cva(
  // Default styles
  '',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      weight: {
        regular: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      colour: {
        default: '',
        caption: 'text-gray-500',
        error: 'text-red-500',
      },
    },
    defaultVariants: {
      size: 'md',
      weight: 'regular',
      colour: 'default',
    },
  }
);

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

const Text = ({ className, size, weight, colour, ...props }: TextProps) => {
  // TODO: Alternatively, use span for inline. Add if needed later
  const Component = 'p';

  return (
    <Component
      className={cn(textVariants({ size, weight, className, colour }))}
      {...props}
    />
  );

  {
    /* </Component> */
  }
};

export { Text, textVariants };
