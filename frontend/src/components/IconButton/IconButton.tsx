import { FC, MouseEvent, ReactElement } from 'react'

import { useRippleState } from '@/hooks/useRippleState'

import { IconButtonSize } from './constants'

import styles from './IconButton.module.scss'

import classNames from 'classnames'

interface IconButtonProps {
  bordered?: boolean
  disabled?: boolean
  icon?: ReactElement
  image?: string
  imageAlt?: string
  size: IconButtonSize
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

/**
 * IconButton component renders a button with an optional icon or image,
 * and supports ripple effects, size variations, and additional styling options.
 *
 * @component
 * @param {IconButtonProps} props - The properties for the IconButton component.
 * @param {React.ReactNode} props.icon - The icon to display inside the button.
 * @param {string} [props.image] - The srs of the image to display inside the button.
 * @param {string} [props.imageAlt=''] - The alt text for the image, defaults to an empty string.
 * @param {'small' | 'medium' | 'large'} props.size - The size of the button. See `iconButtonSizes` in `constants.ts` for available sizes.
 * @param {function} props.onClick - The callback function to handle button click events.
 * @param {boolean} [props.bordered=false] - Whether the button should have a bordered style, defaults to false.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled, defaults to false.
 *
 * @returns {JSX.Element} A button element with optional icon, image, and ripple effects.
 *
 * @example
 * import { iconButtonSizes } from '@/components/IconButton/constants'
 *
 * <IconButton
 *   icon={<SomeIcon />}
 *   size={iconButtonSizes.SMALL}
 *   onClick={() => console.log('Button clicked')}
 *   bordered
 * />
 */

export const IconButton: FC<IconButtonProps> = ({
  icon,
  image,
  imageAlt = '',
  size,
  onClick,
  bordered = false,
  disabled = false
}) => {
  const { ripples, createRipple } = useRippleState()
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    createRipple(e)
    onClick(e)
  }
  const buttonClass = classNames(styles.iconButton, {
    [styles.small]: size === 'small',
    [styles.medium]: size === 'medium',
    [styles.large]: size === 'large',
    [styles.bordered]: bordered,
    [styles.disabled]: disabled
  })

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      type="button"
      onMouseDown={handleClick}
    >
      {icon ? (
        icon
      ) : image ? (
        <img alt={imageAlt} aria-hidden={!imageAlt} src={image} />
      ) : null}
      <div className="ripple-container">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple"
            style={{
              width: ripple.size,
              height: ripple.size,
              left: ripple.x,
              top: ripple.y
            }}
          />
        ))}
      </div>
    </button>
  )
}
