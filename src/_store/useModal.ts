import { create } from 'zustand'

export type ModalType = 'modalChangePassword' | 'modalAddProduct'

export type useModalProps = {
  [key in ModalType]: boolean
} & {
  setModal: (type: ModalType) => void
}

export const useModal = create<useModalProps>((set) => ({
  modalChangePassword: false,
  modalAddProduct: false,
  setModal: (type) => {
    set((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  },
}))
