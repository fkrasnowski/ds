import { z } from 'zod'
import parsePhoneNumber from '@ibash/libphonenumber-js'

export const zFile = ({
  allowedFileTypes,
  maxSizeMB
}: {
  allowedFileTypes: string[]
  maxSizeMB: number
}) =>
  z
    .instanceof(File)
    .refine(
      (file) => allowedFileTypes.includes(file.type),
      `Invalid file type. Must be one of: ${allowedFileTypes.join(', ')}`
    )
    .refine(
      (file) => file.size <= 1024 * 1024 * maxSizeMB,
      `File to large. Must be max. ${maxSizeMB}MB`
    )

export const zPhoneNumber = z.string().transform((value, ctx) => {
  const phoneNumber = parsePhoneNumber(value, {
    defaultCountry: 'PL'
  })

  if (!phoneNumber?.isValid()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid phone number'
    })
    return z.NEVER
  }

  return phoneNumber.formatInternational()
})
