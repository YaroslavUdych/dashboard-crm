import { FC, ReactNode } from 'react'

import styles from './Card.module.scss'

import classNames from 'classnames'

interface CardProps {
  className?: string
  children: ReactNode
}

/**
 * A reusable `Card` component that serves as a container for content.
 *
 * @category Components
 *
 * @param {CardProps} props - The props for the Card component.
 * @param {string} [props.className] - Additional CSS class names to apply to the card.
 * @param {React.ReactNode} props.children - The content to be rendered inside the card.
 *
 * @returns {JSX.Element} A styled `<section>` element wrapping the provided children.
 */
export const Card: FC<CardProps> = ({ className, children }) => {
  const cardClasses = classNames(styles.card, className)

  return <section className={cardClasses}>{children}</section>
}
