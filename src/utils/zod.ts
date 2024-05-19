import { z } from 'zod'

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
