'use client'

import {
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { Transition } from '@headlessui/react'

import { VariantProps, cva } from 'class-variance-authority'

import Icon from '@/common/icons'
import { cn } from '@/lib/utils'

const modalVariants = cva('bg-white shadow-box w-full', {
  variants: {
    variant: {
      default: 'rounded-lg p-3',
    },
    size: {
      default: 'w-[500px]',
      lg: 'w-[650px]',
      sm: 'w-[300px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface ModalInnerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  center?: boolean
  title?: string
  closeOutside?: boolean
  children?: ReactNode
  header?: string
}

export type ModalProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const Modal = forwardRef<ModalProps, ModalInnerProps>(
  (
    {
      className,
      variant,
      title,
      size,
      center,
      children,
      header,
      closeOutside = false,
      ...props
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null)

    const [open, setOpen] = useState(false)

    const onOpen = () => {
      setOpen(true)
    }

    const onClose = () => {
      setOpen(false)
    }

    useImperativeHandle(ref, () => ({
      isOpen: !!open,
      onClose,
      onOpen,
    }))

    const onCloseOutSide = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      if (modalRef.current) {
        if (!modalRef.current.contains(event.target as Node)) {
          onClose()
        }
      }
    }
    // close by Esc keyboard
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          open && onClose()
        }
      }
      window.addEventListener('keydown', handleEsc)
      if (open) {
        document.body.style.overflow = 'hidden'
      }
      return () => {
        window.removeEventListener('keydown', handleEsc)
        document.body.style.overflow = 'unset'
      }
    }, [open])

    return (
      <>
        <Transition
          show={open}
          appear
          className={
            center
              ? 'fixed bottom-0 left-0 right-0 top-0 z-[1001] flex items-center justify-center overflow-y-auto bg-slate-900/25 px-2 opacity-100 backdrop-blur transition-opacity md:px-0'
              : 'fixed bottom-0 left-0 right-0 top-0 z-[1001] flex items-start justify-center overflow-y-auto bg-slate-900/25 px-2 pt-16 opacity-100 backdrop-blur transition-opacity md:px-0'
          }
          onClick={closeOutside ? onCloseOutSide : undefined}
        >
          <Transition.Child
            enter="transition ease-in-out duration-200"
            enterFrom="opacity-0 scale-0"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in-out duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-0"
            className={cn(modalVariants({ variant, size, className }), 'mb-10')}
            ref={modalRef}
            {...props}
          >
            {!!header ? (
              <header className="flex items-center justify-between">
                <h2 className=" font-medium">{header}</h2>
                <div
                  onClick={onClose}
                  className="p-2 hover:cursor-pointer hover:text-secondary"
                >
                  <Icon name="Xmark" size={25} />
                </div>
              </header>
            ) : null}

            {children}
          </Transition.Child>
        </Transition>
      </>
    )
  }
)

Modal.displayName = 'Modal'

export { Modal, modalVariants }
