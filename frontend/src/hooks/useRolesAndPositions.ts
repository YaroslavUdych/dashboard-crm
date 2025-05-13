import {
  useGetAllPositionsQuery,
  useGetAllRolesQuery
} from '@/store/api/userApi'

/**
 * A custom hook that fetches and processes roles and positions data.
 *
 * @category Hooks
 *
 * @returns An object containing:
 * - `roles`: An array of roles formatted as `{ value: number, label: string }`.
 * - `positions`: An array of positions formatted as `{ value: number, label: string }`.
 * - `isRolesAndPositionsLoading`: A boolean indicating if either roles or positions data is still loading.
 * - `rolesAndPositionsError`: An error object if there was an error fetching roles or positions data.
 *
 * @example
 * ```tsx
 * const { roles, positions, isRolesAndPositionsLoading, rolesAndPositionsError } = useRolesAndPositions()
 * ```
 */
export const useRolesAndPositions = () => {
  const {
    data: roles,
    isLoading: isRolesLoading,
    error: rolesError
  } = useGetAllRolesQuery({})

  const {
    data: positions,
    isLoading: isPositionsLoading,
    error: positionsError
  } = useGetAllPositionsQuery({})

  interface Role {
    id: number
    name: string
  }

  interface Position {
    id: number
    name: string
  }

  return {
    roles:
      roles?.map((role: Role) => ({
        value: role.id,
        label: role.name
      })) || [],
    positions:
      positions?.map((pos: Position) => ({
        value: pos.id,
        label: pos.name
      })) || [],
    isRolesAndPositionsLoading: isRolesLoading || isPositionsLoading,
    rolesAndPositionsError: rolesError || positionsError
  }
}
