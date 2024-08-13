import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils/tw.utils';

const badgeVariants = cva(
  'h-fit inline-flex items-center rounded-full border px-2.5 py-0.5 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
      colour: {
        default: '',
        primary: 'text-primary-700 border-primary-700',
        gray: 'text-gray-700 border-gray-500',
        error: 'text-error-700 border-error-700',
        success: 'text-success-700 border-success-700',
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      colour: 'default',
      size: 'xs',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, colour, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, colour, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
