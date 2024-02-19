'use client'

import Icon from '@/common/icons'

export default function OrderAction() {
  return (
    <div className="ml-4 flex items-center gap-1 text-sm hover:cursor-pointer">
      <Icon name="Pen" size={15} color="blue" />
      <span className="text-blue-700">Edit</span>
    </div>
  )
}
