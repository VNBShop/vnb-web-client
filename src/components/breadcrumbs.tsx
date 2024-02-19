import * as React from 'react'

import Link from 'next/link'

import Icon from '@/common/icons'
import { cn, truncate } from '@/lib/utils'

interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<'nav'> {
  segments: {
    title: string
    href: string
  }[]
  separator?: React.ComponentType<{ className?: string }>
  truncationLength?: number
}

export function Breadcrumbs({
  segments,
  separator,
  truncationLength = 0,
  className,
  ...props
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="breadcrumbs"
      className={cn(
        'text-muted-foreground flex w-full items-center overflow-auto text-sm ',
        className
      )}
      {...props}
    >
      {segments.map((segment, index) => {
        const isLastSegment = index === segments.length - 1

        return (
          <React.Fragment key={segment.href}>
            <Link
              aria-current={isLastSegment ? 'page' : undefined}
              href={segment.href}
              className={cn(
                'truncate transition-colors hover:underline',
                isLastSegment ? 'text-black' : 'text-gray-500'
              )}
            >
              {truncationLength > 0 && segment.title
                ? truncate(segment.title, truncationLength)
                : segment.title}
            </Link>
            {!isLastSegment && (
              <Icon name="ChevronRightThin" size={22} aria-hidden="true" />
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
