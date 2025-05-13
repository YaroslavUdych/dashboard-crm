import { FC } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { useGetUserByIdQuery } from '@/store/api/userApi'

import styles from './Breadcrumbs.module.scss'

/**
 * Breadcrumbs component generates a navigation trail based on the current URL path.
 * It dynamically creates breadcrumb links for each segment of the path and displays
 * the user's full name if the path matches the user ID.
 *
 * @category Components
 *
 * @description
 * - Uses `useLocation` to get the current URL path.
 * - Uses `useParams` to extract the `id` parameter from the URL.
 * - Fetches user data using `useGetUserByIdQuery` if an `id` is present in the URL.
 * - Converts path segments into human-readable breadcrumb names.
 * - Highlights the last breadcrumb as the current page without a link.
 *
 * @returns {JSX.Element} A navigation element containing breadcrumb links.
 *
 *
 * @example
 * // Example URL: /users/123
 * // Breadcrumbs output:
 * // Home > Users > John Doe
 *
 */

export const Breadcrumbs: FC = () => {
  const location = useLocation()
  const { id } = useParams<{ id: string }>() // get id from URL

  // get user data by id
  const { data: user, isError } = useGetUserByIdQuery(Number(id), {
    skip: !id // skip the query if there is no id
  })

  const pathnames = location.pathname.split('/').filter((path) => path)

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    ...(pathnames
      .map((path, index) => {
        // check if the path is the user ID
        if (id && path === id) {
          // return user's full name if user data is available
          if (user && !isError) {
            return {
              name: user.fullName,
              path: `/${pathnames.slice(0, index + 1).join('/')}`
            }
          }
          return null
        }

        return {
          name: path
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          path: `/${pathnames.slice(0, index + 1).join('/')}`
        }
      })
      .filter(Boolean) as { name: string; path: string }[]) // filter out null values
  ]

  return (
    <nav className={styles.breadcrumbs}>
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.path} className={styles.breadcrumb}>
          {index !== breadcrumbs.length - 1 ? (
            <Link to={breadcrumb.path}>{breadcrumb.name}</Link>
          ) : (
            <span className={styles.breadcrumbLastChild}>
              {breadcrumb.name}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
