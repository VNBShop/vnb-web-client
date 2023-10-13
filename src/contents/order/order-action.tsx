'use client'

import Icon from '@/common/icons'

export default function OrderAction() {
  return (
    <div className="flex items-center gap-1 text-sm ml-4 hover:cursor-pointer">
      <Icon name="Pen" width={15} height={15} color="blue" />
      <span className="text-blue-700">Edit</span>
    </div>
  )
}
