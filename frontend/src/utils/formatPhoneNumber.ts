/**
 * Formats a phone number string into a standardized format.
 *
 * The function removes any non-numeric characters (except for the '+' sign)
 * and formats the phone number to match the pattern: `+XXX XXX XXX XXX`.
 *
 * @сategory Utils
 * @param phoneNumber - The phone number string to be formatted.
 * @returns The formatted phone number string if it matches the expected pattern,
 *          otherwise returns the original input string.
 */

export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/[^\d+]/g, '')

  const match = cleaned.match(/^(\+\d{3})(\d{3})(\d{3})(\d{3})$/)

  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`
  }

  return phoneNumber
}
