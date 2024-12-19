import { z } from "zod";
import { axiosInstance } from "./axios";

export const createZodSchema = (formObjects) => {
  let schema = z.object({});

  formObjects.forEach(({ type, ...formObject }) => {
    if (type == "flex") {
      const { type, items, className, ...itemProps } = formObject;
      const flexSchema = createZodSchema(
        formObject.items.map((item) => ({ ...itemProps, ...item }))
      );
      schema = schema.merge(flexSchema);
      return;
    }

    let fieldSchema = validators[type]
      ? validators[type](formObject)
      : validators.text(formObject);
    fieldSchema = formObject.required ? fieldSchema : fieldSchema.optional();

    schema = schema.extend({ [formObject.name]: fieldSchema });
  });

  return schema;
};

export const createDefaultFormData = (formObjects) => {
  const formData = {};

  formObjects.forEach((field) => {
    formData[field.name] = field.default ?? "";
  });

  return formData;
};

export const createErrors = (zodError) => {
  const errors = {};
  zodError.issues.forEach((issue) => {
    errors[issue.path[0]] = issue.message;
  });

  return errors;
};

const validators = {
  text({ label, name, required }) {
    label = label ?? name;
    let schema = z.string({ required_error: `${name} is required` });

    if (required) schema = schema.min(1, { message: `${name} is required` });
    return schema;
  },
  email(props) {
    return this.text(props).email();
  },
  number({ label, name, required, min, max }) {
    label = label ?? name;
    let schema = z.coerce.number({
      required_error: `${name} is required`,
      invalid_type_error: "You need to enter an amount/number",
    });

    if (min) {
      schema = schema.min(min, {
        message: `${name} should be greater than ${min} `,
      });
    }
    if (max) {
      schema = schema.max(max, {
        message: `${name} should be greater than ${max} `,
      });
    }
    return schema;
  },

  tel({ label, name, required }) {
    let schema = z
      .string({
        required_error: `${name} is required`,
        invalid_type_error: "You need to enter an amount/number",
      })
      .length(11, {
        message: "Phone number should be 11 characters long",
      });

    return schema;
  },

  select({ label, name, required, options }) {
    label = label ?? name;
    let validValues =
      typeof options[0] !== "string"
        ? options.map((option) => option.value)
        : options;

    let schema = z.enum(validValues, {
      required_error: `${name} is required`,
      invalid_type_error: `You need to select a valid value`,
    });

    return schema;
  },

  date({ label, name }) {
    label = label ?? name;
    let schema = z.coerce.date({ required_error: `${name} is required` });

    return schema;
  },

  "datetime-local"({ label, name }) {
    return this.date({ label, name });
  },

  file({ label, name, required, fileTypes = [], maxSize = Infinity }) {
    return z
      .any()
      .refine((file) => file?.size <= maxSize, {
        message: `File size exceeds the maximum allowed size of ${
          maxSize / 1024
        } KB`,
      })
      .refine(
        (file) => (fileTypes.length ? fileTypes.includes(file?.type) : true),
        {
          message: `Invalid file type. File must be of type: ${fileTypes
            .map((type) => type.toUpperCase())
            .join(" or ")}`,
        }
      )
      .refine((file) => (required ? file : true), {
        message: `${name} is required`,
      });
  },
};

export const handleFormSubmitHelper = async ({
  formSchema,
  formData,
  endPoint,
  method = "post",
  axiosConfig = {},
  setSubmitStatus,
  onFormError,
  onError,
  onSuccess,
  onSubmitStart,
  onSubmitEnd,
}) => {
  // Can be controlled using events and/or setSubmitStatus state function
  let formStatus = {};
  const validatedFormData = formSchema
    ? formSchema.safeParse(formData)
    : { success: true, data: formData };

  if (!validatedFormData.success) {
    formStatus = {
      status: "form_error",
      error: createErrors(validatedFormData.error),
    };
    setSubmitStatus?.(formStatus);
    await onFormError?.(formStatus);
    return formStatus;
  }

  formStatus = { status: "submitting", data: validatedFormData.data };
  setSubmitStatus?.(formStatus);
  await onSubmitStart?.(formStatus);

  try {
    const response = await axiosInstance.request({
      url: endPoint,
      method,
      data: validatedFormData.data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...axiosConfig,
    });
    formStatus = { status: "success", response };
    setSubmitStatus?.(formStatus);
    await onSuccess?.(formStatus);
  } catch (err) {
    formStatus = {
      status: "error",
      error:
        (typeof err.response?.data?.error == "string"
          ? err.response?.data?.error
          : err.response?.data?.message) ??
        err.response?.data?.error ??
        err.message,
      err,
    };
    setSubmitStatus?.(formStatus);
    await onError?.(formStatus);
  }
  await onSubmitEnd?.();
  return formStatus;
};
