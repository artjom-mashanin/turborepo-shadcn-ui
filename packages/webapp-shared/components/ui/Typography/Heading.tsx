import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../lib/utils/tw.utils';

const headingVariants = cva(
  // Default styles
  '',
  {
    variants: {
      variant: {
        h1: 'text-6xl',
        h2: 'text-3xl',
        h3: 'text-xl',
        h4: 'text-lg',
      },
      weight: {
        regular: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      variant: 'h1',
      weight: 'semibold',
    },
  }
);

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const Heading = ({ className, variant, weight, ...props }: HeadingProps) => {
  const Component = variant ?? 'h1';

  return (
    <Component
      className={cn(headingVariants({ variant, weight, className }))}
      {...props}
    />
  );

  {
    /* </Component> */
  }
};

export { Heading, headingVariants };
