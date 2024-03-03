import { OrderedStatus } from '../../types/order'

export const colorsOrderedStatus: Record<
  OrderedStatus,
  {
    color: string
    backgroundColor: string
  }
> = {
  CANCELLED: {
    color: '#fa4515',
    backgroundColor: '#ffe4d5',
  },
  DELIVER_FAILED: {
    backgroundColor: '#fceae7',
    color: '#aa2629',
  },
  DELIVERING: {
    color: '#492E87',
    backgroundColor: '#e0dfff',
  },
  PENDING: {
    color: '#ca8d04',
    backgroundColor: '#fefac3',
  },
  RE_DELIVERING: {
    color: '#773f17',
    backgroundColor: '#fdf3d7',
  },
  SUCCESS: {
    color: '#5d8e22',
    backgroundColor: '#e9f5d2',
  },
}

export const orderedStatusOption: {
  label: string
  value: OrderedStatus
}[] = [
  {
    label: 'Success',
    value: 'SUCCESS',
  },
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Delivering',
    value: 'DELIVERING',
  },
  {
    label: 'Re delivering',
    value: 'RE_DELIVERING',
  },
  {
    label: 'Failed',
    value: 'DELIVER_FAILED',
  },
  {
    label: 'Cancelled',
    value: 'CANCELLED',
  },
]
