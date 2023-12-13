'use client'

import { HTMLAttributes, ReactNode, forwardRef, useEffect, useRef } from 'react'

import { Transition } from '@headlessui/react'

import { VariantProps, cva } from 'class-variance-authority'

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

export interface ModalProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  show: boolean
  close?: (state: boolean) => void
  center?: boolean
  title?: string
  closeOutside?: boolean
  children?: ReactNode
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      variant,
      title,
      size,
      show,
      center,
      close,
      children,
      closeOutside = false,
      ...props
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null)

    const onCloseOutSide = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      if (modalRef.current) {
        if (!modalRef.current.contains(event.target as Node)) {
          close?.(true)
        }
      }
    }
    // close by Esc keyboard
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          show && close?.(false)
        }
      }
      window.addEventListener('keydown', handleEsc)
      if (show) {
        document.body.style.overflow = 'hidden'
      }
      return () => {
        window.removeEventListener('keydown', handleEsc)
        document.body.style.overflow = 'unset'
      }
    }, [show, close])

    return (
      <>
        {/* {show && ( */}
        <Transition
          show={show}
          ref={ref}
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
            className={cn(modalVariants({ variant, size, className }))}
            ref={modalRef}
            {...props}
          >
            {children}
          </Transition.Child>
        </Transition>
        {/* )} */}
      </>
    )
  }
)

Modal.displayName = 'Modal'

export { Modal, modalVariants }
