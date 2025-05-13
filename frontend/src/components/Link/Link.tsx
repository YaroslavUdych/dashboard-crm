import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { iconLinkPositions, LinkType, linkTypes } from './constants'

import styles from './Link.module.scss'

interface LinkProps {
  type: LinkType
  to: string
  text: string
  icon?: ReactNode
  iconPosition?: string
  key?: string
}

/**
 * The `LinkComponent` is a reusable component that renders a styled link with optional icon support.
 * The component can render either an internal or external link based on the `type` prop.
 *
 * @category Components
 *
 * @param {LinkProps} props - The properties for the LinkComponent.
 * @param {string} props.type - The type of the link, either internal or external. See `constants.ts` for available types.
 * @param {string} props.to - The destination URL or path for the link.
 * @param {string} props.text - The text content to display for the link.
 * @param {string} props.key - A unique key for the link component.
 * @param {ReactNode} [props.icon] - An optional icon to display alongside the link.
 * @param {string} [props.iconPosition] - The position of the icon relative to the link text. See `constants.ts` for available positions.
 *
 * @returns {JSX.Element} A styled link component with optional icon support.
 */

export const LinkComponent: FC<LinkProps> = ({
  type,
  to,
  text,
  key,
  icon,
  iconPosition
}) => {
  return (
    <div key={key} className={styles.linkWrap}>
      {icon && iconPosition === iconLinkPositions.START && (
        <div className={styles.icon}>{icon}</div>
      )}
      {type === linkTypes.INTERNAL ? (
        <Link to={to}>{text}</Link>
      ) : (
        <a href={to} rel="noreferrer" target="_blank">
          {text}
        </a>
      )}
      {icon && iconPosition === iconLinkPositions.END && (
        <div className={styles.icon}>{icon}</div>
      )}
    </div>
  )
}
