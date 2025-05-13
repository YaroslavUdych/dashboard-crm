import { ChangeEvent, FC, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import { IconButton } from '@/components/IconButton/IconButton'
import { Icons } from '@/components/Icons'

import { iconButtonSizes } from '../IconButton/constants'
import { AVATAR_LIST, DEFAULT_AVATAR } from './constants'

import styles from './UploadPhoto.module.scss'

interface UploadPhotoProps {
  register: UseFormRegisterReturn
  userAvatar?: string
}

/**
 * UploadPhoto component allows users to upload a photo or select an avatar from a predefined list.
 *
 * @category Components
 * @param {UploadPhotoProps} props - The props for the UploadPhoto component.
 * @param {UseFormRegisterReturn} props.register - The register object from react-hook-form for managing form input.
 * @param {string} props.userAvatar - The initial avatar URL to display as the default preview.
 *
 * @returns {JSX.Element} The rendered UploadPhoto component.
 *
 * @description
 * - Users can upload an image file or select an avatar from the provided list.
 * - The uploaded file or selected avatar is passed to the parent form via the `register` object.
 * - The component supports image files with extensions `.jpg`, `.jpeg`, `.png`, `.webp`, and `.svg`.
 * - Maximum file size for uploads is 2 MB.
 *
 * @example
 * ```tsx
 * import { useForm } from 'react-hook-form';
 *
 * const { register } = useForm();
 *
 * <UploadPhoto
 *   register={register('avatar')}
 *   userAvatar="https://example.com/default-avatar.png"
 * />
 * ```
 */

export const UploadPhoto: FC<UploadPhotoProps> = ({ register, userAvatar }) => {
  const [preview, setPreview] = useState<string>(userAvatar || DEFAULT_AVATAR)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)

      register.onChange({
        target: {
          name: register.name,
          value: file
        }
      })
    }
  }

  const handleAvatarSelect = (avatar: string) => {
    if (preview === avatar) return
    setPreview(avatar)

    register.onChange({
      target: {
        name: register.name,
        value: avatar
      }
    })
  }

  return (
    <div className={styles.uploadPhotoContainer}>
      {/* Main block upload photo */}
      <label className={styles.uploadPhoto}>
        <img alt="Avatar" className={styles.avatar} src={preview} />
        <input
          accept="image/*"
          type="file"
          {...register}
          onChange={handleFileChange}
        />
        <div className={styles.uploadOverlay}>
          <Icons.PhotoCamera />
          <span className={styles.text}>Upload photo</span>
        </div>
      </label>

      {/* Avatar list */}
      <p className={styles.selectAvatarText}>
        <span> Click on photo to upload</span>
        <span className={styles.limitText}>* max file size 2 Mb</span>
        <span className={styles.limitText}>
          * allowed extensions - .jpg, .jpeg, .png, .webp, .svg
        </span>
        <span className={styles.divider}></span>
        <span>or choose an avatar</span>
      </p>
      <div className={styles.avatarList}>
        {AVATAR_LIST.map((avatar, index) => (
          <div key={index} className={styles.avatarItem}>
            <IconButton
              image={avatar}
              imageAlt={`Avatar ${index}`}
              size={iconButtonSizes.LARGE}
              onClick={() => handleAvatarSelect(avatar)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
