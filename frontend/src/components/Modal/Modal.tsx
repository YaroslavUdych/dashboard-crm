import { AnimatePresence, motion } from 'framer-motion'
import { forwardRef, ReactNode, useImperativeHandle, useState } from 'react'

import { Button } from '@/components/Button/Button'
import {
  buttonColors,
  buttonSizes,
  buttonTypes,
  buttonVariants
} from '@/components/Button/constants'

import styles from './Modal.module.scss'

export interface ModalHandle {
  onOpen: () => void
  onClose: () => void
}

interface ModalProps {
  title?: string
  children: ReactNode
  confirmButtonText?: string
  onConfirm?: () => void
}

/**
 * A reusable `Modal` component that provides a customizable modal dialog with animations.
 * This component uses `framer-motion` for animations and supports imperative handle methods
 * for opening and closing the modal programmatically.
 * Use the `useModal` hook in this project to manage the modal actions.
 *
 * @category Components
 *
 * @param {ModalProps} props - The props for the Modal component.
 * @param {string} [props.title] - The title of the modal, displayed at the top.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {string} [props.confirmButtonText='Confirm'] - The text for the confirm button.
 * @param {() => void} [props.onConfirm] - Callback function triggered when the confirm button is clicked.
 * @param {React.Ref<ModalHandle>} ref - A ref object to access the modal's imperative methods.
 *
 * @returns {JSX.Element} The rendered Modal component.
 *
 * @example
 * ```tsx
 * import {useModal} from '@/hooks/useModal'
 *
 * const {modalRef, openModal, closeModal} = useModal()
 *
 * const handleConfirm = () => {
 *   console.log('Confirmed!');
 * };
 *
 * return (
 *   <>
 *     <Button onClick={handleOpenModal} text="Open Modal" />
 *     <Modal
 *       ref={modalRef}
 *       title="Example Modal"
 *       confirmButtonText="OK"
 *       onConfirm={handleConfirm}
 *     >
 *       <p>This is the modal content.</p>
 *     </Modal>
 *   </>
 * );
 * ```
 */
export const Modal = forwardRef<ModalHandle, ModalProps>(
  ({ title, children, confirmButtonText = 'Confirm', onConfirm }, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const onOpen = () => setIsOpen(true)
    const onClose = () => setIsOpen(false)

    useImperativeHandle(ref, () => ({
      onOpen,
      onClose
    }))

    const handleConfirm = () => {
      onConfirm?.()
      onClose()
    }

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className={styles.overlay}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              className={styles.modal}
              exit={{ scale: 0.8, opacity: 0 }}
              initial={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
            >
              {title && <h2 className={styles.title}>{title}</h2>}
              <div className={styles.content}>{children}</div>
              <div className={styles.actions}>
                <Button
                  color={buttonColors.ERROR}
                  size={buttonSizes.SMALL}
                  text={confirmButtonText}
                  type={buttonTypes.BUTTON}
                  variant={buttonVariants.CONTAINED}
                  onClick={handleConfirm}
                />
                <Button
                  color={buttonColors.DEFAULT}
                  size={buttonSizes.SMALL}
                  text="Cancel"
                  type={buttonTypes.BUTTON}
                  variant={buttonVariants.CONTAINED}
                  onClick={onClose}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)
Modal.displayName = 'Modal'
