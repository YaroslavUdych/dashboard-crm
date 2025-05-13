import { useRef } from 'react'

import { ModalHandle } from '@/components/Modal/Modal'

/**
 * A custom hook that provides functionality to manage a modal component.
 *
 * @category Hooks
 *
 * @returns An object containing:
 * - `modalRef`: A reference to the modal component, typed as `ModalHandle`.
 * - `openModal`: A function to open the modal by invoking the `onOpen` method on the modal reference.
 * - `closeModal`: A function to close the modal by invoking the `onClose` method on the modal reference.
 *
 * @example
 * ```tsx
 * const { modalRef, openModal, closeModal } = useModal()
 * ```
 */
export const useModal = () => {
  const modalRef = useRef<ModalHandle>(null)

  const openModal = () => modalRef.current?.onOpen()
  const closeModal = () => modalRef.current?.onClose()

  return { modalRef, openModal, closeModal }
}
