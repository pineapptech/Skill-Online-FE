import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf",
];

export const registrationSchema = z.object({
  course: z
    .string({ required_error: "Select a course" })
    .min(1, "Select a course"),
  regNo: z.string().optional(),
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, "First name is required"),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, "Last name is required"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Select your gender",
    invalid_type_error: "Select a valid gender",
  }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(1, "Phone number is required"),
  state: z
    .string({ required_error: "State/Country is required" })
    .min(1, "State/Country is required"),
  // city: z
  //   .string({ required_error: "City is required" })
  //   .min(1, "City is required"),
  address: z
    .string({ required_error: "Address is required" })
    .min(1, "Address is required"),
  passportId: z.enum(["Passport", "National ID", "Guadian ID"], {
    required_error: "ID Type is required",
    invalid_type_error: "Select a valid ID Type",
  }),
  file: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, {
      message: `File size exceeds the maximum allowed size of ${
        MAX_FILE_SIZE / 1024
      } KB`,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      message: `Invalid file type. File must be of type: ${ACCEPTED_IMAGE_TYPES.map(
        (type) => type.toUpperCase()
      ).join(" or ")}`,
    })
    .refine((file) => !!file, { message: "ID File is required" }),
  promoCode: z.string().optional(),
  agreement: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to the terms and conditions",
    }),
  }),
  province: z.string().min(1, "Province/Zone is required"),
  TIC: z.string().min(1, "TIC Code is required"),
});
