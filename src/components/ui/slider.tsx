'use client'

import * as React from 'react'

import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    variant?: 'default' | 'range'
    thickness?: 'default' | 'thin'
  }
>(
  (
    { className, variant = 'default', thickness = 'default', ...props },
    ref
  ) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex w-full touch-none select-none items-center lg:hover:cursor-pointer',
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          'relative h-2 w-full grow overflow-hidden rounded-full bg-gray-300',
          thickness === 'thin' && 'h-0.5'
        )}
      >
        <SliderPrimitive.Range className="absolute h-full bg-gray-500" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          'block h-5 w-5 rounded-full border-2 border-gray-500 bg-gray-500 ring-offset-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          thickness === 'thin' && 'h-3.5 w-3.5'
        )}
      />
      {variant === 'range' && (
        <SliderPrimitive.Thumb
          className={cn(
            'block h-5 w-5 rounded-full border-2 border-gray-500 bg-gray-500 ring-offset-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            thickness === 'thin' && 'h-3.5 w-3.5'
          )}
        />
      )}
    </SliderPrimitive.Root>
  )
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
