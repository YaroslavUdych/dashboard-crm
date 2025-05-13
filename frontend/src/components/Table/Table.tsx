import { FC, ReactElement, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/Button/Button'
import { placements } from '@/components/DropdownList/constants'
import { DropdownList } from '@/components/DropdownList/DropdownList'
import { iconButtonSizes } from '@/components/IconButton/constants'
import { IconButton } from '@/components/IconButton/IconButton'
import { Icons } from '@/components/Icons'

const DEFAULT_AVATAR_IMAGE = '/defaultUserImage.webp'

import styles from './Table.module.scss'

interface TableProps {
  tableBarChildren: ReactElement
  tableFooterChildren?: ReactElement
  data: Array<Record<string, string | number>> // data to render
  columns: Array<{ key: string; label: string }> // description of columns
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export const Table: FC<TableProps> = ({
  tableBarChildren,
  tableFooterChildren,
  data,
  columns,
  onEdit,
  onDelete
}) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  )

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableBar}>{tableBarChildren}</div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.label === 'Name' ? (
                      <div className={styles.nameCell}>
                        <img
                          alt="User avatar"
                          className={styles.avatarImage}
                          src={
                            typeof row.avatar === 'string'
                              ? row.avatar
                              : DEFAULT_AVATAR_IMAGE
                          }
                        />
                        <div className={styles.nameInfo}>
                          <Link className={styles.name} to={`/users/${row.id}`}>
                            {row[column.key]}
                          </Link>
                          {row.email && (
                            <span className={styles.userEmail}>
                              {row.email}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
                <td style={{ width: '50px' }}>
                  <DropdownList
                    withArrow
                    isOpen={openDropdownIndex === rowIndex}
                    placement={placements.LEFT}
                    trigger={
                      <IconButton
                        icon={<Icons.ThreeVerticalDots />}
                        size={iconButtonSizes.MEDIUM}
                        onClick={() => toggleDropdown(rowIndex)}
                      />
                    }
                    onClose={() => setOpenDropdownIndex(null)}
                  >
                    <Button
                      fullWidth
                      color="default"
                      size="medium"
                      startIcon={<Icons.Pencil />}
                      text="Edit"
                      type="button"
                      variant="text"
                      onClick={() => onEdit(Number(row.id))}
                    />
                    <Button
                      fullWidth
                      color="error"
                      size="medium"
                      startIcon={<Icons.Trash />}
                      text="Delete"
                      type="button"
                      variant="text"
                      onClick={() => onDelete(Number(row.id))}
                    />
                  </DropdownList>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.tableFooter}>{tableFooterChildren}</div>
    </div>
  )
}
