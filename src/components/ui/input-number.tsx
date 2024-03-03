import { PropsWithoutRef } from 'react'

import { NumericFormat, type NumericFormatProps } from 'react-number-format'

import { cn } from '@/lib/utils'

type InputNumberProps = NumericFormatProps
export default function InputNumber({ className, ...props }: InputNumberProps) {
  return (
    <NumericFormat
      {...props}
      className={cn(
        'flex h-11 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-black file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-bluePlate disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    />
  )
}
