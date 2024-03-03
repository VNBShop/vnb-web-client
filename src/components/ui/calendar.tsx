'use client'

import * as React from 'react'

import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { DayPicker } from 'react-day-picker'

import Icon from '@/common/icons'
import { Button, buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import { Popover, PopoverContent, PopoverTrigger } from './popover'

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  dateRange?: DateRange
  date: any
  onChange: any
  dayCount?: number
  align?: 'center' | 'start' | 'end'
  buttonHeight?: number
  // mode?: 'default' | 'single' | 'multiple' | 'range'
}

export function Calendar({
  dateRange,
  dayCount,
  align = 'start',
  date,
  mode = 'single',
  onChange,
  className,
  classNames,
  buttonHeight,
  showOutsideDays = false,
  ...props
}: CalendarProps) {
  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            style={{
              height: buttonHeight,
            }}
            className={cn(
              'xs:w-[300px] flex w-full items-center justify-start gap-2 truncate bg-white text-left font-normal hover:bg-transparent hover:text-black',
              !date && 'text-muted-foreground'
            )}
          >
            <Icon name="Calendar" size={20} />
            {mode === 'range' ? (
              date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span className="text-gray-400">Pick a date</span>
              )
            ) : !!date && mode === 'single' ? (
              format(date, 'LLL dd, y')
            ) : (
              <span className="text-gray-400">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-[9999] w-auto bg-white p-0" align={align}>
          <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn(' p-3', className)}
            initialFocus
            mode={mode}
            selected={date}
            onSelect={onChange}
            defaultMonth={mode === 'range' ? date?.from : undefined}
            numberOfMonths={mode === 'range' ? 2 : 1}
            classNames={{
              months:
                'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 text-black',
              month: 'space-y-4',
              caption: 'flex justify-center pt-1 relative items-center',
              caption_label: 'text-sm font-medium',
              nav: 'space-x-1 flex items-center',
              nav_button: cn(
                buttonVariants({ variant: 'outline' }),
                'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
              ),
              nav_button_previous: 'absolute left-1',
              nav_button_next: 'absolute right-1',
              table: 'w-full border-collapse space-y-1',
              head_row: 'flex',
              head_cell: 'rounded-md w-8 font-normal text-[0.8rem]',
              row: 'flex w-full mt-2',
              cell: cn(
                'relative p-0 text-center hover:ring-1 hover:ring-secondary rounded-[4px] text-sm focus-within:relative focus-within:z-20',
                mode === 'range'
                  ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
                  : '[&:has([aria-selected])]:rounded-md'
              ),
              day: cn(
                buttonVariants({ variant: 'ghost' }),
                'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
              ),
              day_range_start: 'day-range-start',
              day_range_end: 'day-range-end',
              day_selected: 'text-secondary',
              // day_today: 'bg-[#c1dff6] text-[#1670b3]',
              day_outside: 'text-gray-500 opacity-50',
              day_disabled: 'text-gray-200 opacity-50',
              // day_range_middle:
              //   'aria-selected:bg-red-500 aria-selected:text-accent-foreground',
              day_hidden: 'invisible',
              ...classNames,
            }}
            components={{
              IconLeft: () => <Icon name="ChevronLeft" size={16} />,
              IconRight: () => <Icon name="ChevronRight" size={16} />,
            }}
            {...props}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
