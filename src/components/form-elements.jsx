"use client";
import { useEffect, useState } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { CloudUpload } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

export const FileInput = ({
  label,
  name,
  onChange,
  fileTypes = [],
  classes = "",
  inputProps = {},
  uploadLabel = "Click to Upload File",
  error,
  required,
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (!selectedFile?.type?.startsWith("image")) {
      setImagePreview(null);
      return;
    }

    const imagePreviewURL = window.URL.createObjectURL(selectedFile);
    setImagePreview(imagePreviewURL);

    return () => window.URL.revokeObjectURL(imagePreviewURL);
  }, [selectedFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setSelectedFile(file);
    onChange?.(file);
  };

  return (
    <div
      className={cn(
        "img-upload relative flex flex-col gap-1",
        // "has-[:disabled]:opacity-50 has-[:disabled]:*:cursor-not-allowed",
        typeof classes == "string" ? classes : classes.main
      )}
    >
      <label
        htmlFor={name}
        className={cn(error && "text-red-500", classes.label)}
      >
        <span className="text-sm">
          {label} {required && <span className="text-red-400">{"*"}</span>}
        </span>
        <VisuallyHidden.Root>
          <input
            type="file"
            name={name}
            id={name}
            accept={fileTypes.join(",")}
            onChange={handleFileChange}
            className="appearance-none"
            {...inputProps}
          />
        </VisuallyHidden.Root>
        <div
          className={cn(
            "input-area file-preview h-20 mt-2 rounded-lg text-sm flex flex-col justify-center items-center border border-input bg-background",
            error && "shadow-[0_0_1px_0.5px] shadow-red-500 text-red-500",
            inputProps.disabled && "cursor-not-allowed opacity-50",
            classes.input
          )}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Your uploaded image should appear here"
              className="h-full"
            />
          ) : selectedFile ? (
            <p className="text-center">{selectedFile.name}</p>
          ) : (
            <>
              <CloudUpload size={32} />
              {uploadLabel}
            </>
          )}
        </div>
      </label>
      {error && (
        <div className={cn("error text-red-500 text-xs", classes.error)}>
          {error}
        </div>
      )}
    </div>
  );
};

export const TypeInput = ({
  ref = null,
  type = "text",
  label,
  name,
  placeholder,
  onChange,
  value,
  classes = "",
  icon,
  error,
  inputProps = {},
  required,
}) => {
  const val = onChange ? { value: value } : { defaultValue: value };

  return (
    <div
      className={cn(
        "relative flex flex-col gap-1",
        typeof classes == "string" ? classes : classes.main
      )}
    >
      <label
        htmlFor={name}
        className={cn("text-sm", error && "text-red-500", classes.label)}
      >
        {label} {required && <span className="text-red-400">{"*"}</span>}
      </label>
      <div className={cn("relative", classes.inputContainer)}>
        {icon && (
          <div
            className={cn(
              "icon text-muted-foreground absolute bottom-1/2 translate-y-1/2 ml-2 *:w-6",
              classes.icon
            )}
          >
            {icon}
          </div>
        )}
        <Input
          ref={ref}
          type={type}
          id={name}
          name={name}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            "input-area",
            error && "shadow-[0_0_1px_0.5px] shadow-red-500",
            icon && "pl-9",
            classes.input
          )}
          placeholder={placeholder}
          {...val}
          {...inputProps}
        />
      </div>
      {error && (
        <div className={cn("error text-xs text-red-500", classes.error)}>
          {error}
        </div>
      )}
    </div>
  );
};

export const SelectInput = ({
  label,
  name,
  onChange,
  value,
  options = [],
  placeholder,
  classes = "",
  icon,
  required,
  error,
  inputProps = {},
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-1",
        typeof classes == "string" ? classes : classes.main
      )}
    >
      <label
        htmlFor={name}
        className={cn("text-sm", error && "text-red-500", classes.label)}
      >
        {label}
        {required && <span className="text-red-400">{" *"}</span>}
      </label>
      <Select
        id={name}
        name={name}
        onValueChange={onChange}
        value={value}
        className={classes.select}
        {...inputProps}
      >
        <SelectTrigger
          className={cn(
            "input-area",
            error && "shadow-[0_0_1px_0.5px] shadow-red-500",
            classes.input,
            classes.trigger
          )}
        >
          <div className="value flex gap-2 items-end">
            {icon}
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent className={classes.content}>
          {options.map((option) => {
            const { label, value } =
              typeof option == "string"
                ? {
                    label: option,
                    value: option,
                    // .split(" ")
                    // .map((s, i) =>
                    //   i > 0
                    //     ? s[0].toUpperCase() + s.slice(1).toLowerCase()
                    //     : s.toLowerCase()
                    // )
                    // .join(""),
                  }
                : option;

            return (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {error && (
        <div className={cn("error text-xs text-red-500", classes.error)}>
          {error}
        </div>
      )}
    </div>
  );
};

export const TextareaInput = ({
  ref = null,
  name,
  label,
  placeholder,
  onChange,
  value,
  classes = "",
  error,
  inputProps = {},
  required,
}) => {
  const val = onChange ? { value: value } : { defaultValue: value };

  return (
    <div
      className={cn(
        "relative flex flex-col gap-2",
        typeof classes == "string" ? classes : classes.main
      )}
    >
      <label
        htmlFor={name}
        className={cn("text-sm", error && "text-red-500", classes.label)}
      >
        {label} {required && <span className="text-red-400">{"*"}</span>}
      </label>
      <Textarea
        ref={ref}
        id={name}
        name={name}
        placeholder={placeholder ?? label}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "input-area",
          error && "shadow-[0_0_1px_0.5px] shadow-red-500",
          classes.input
        )}
        {...val}
        {...inputProps}
      />
      {error && (
        <div className={cn("error text-xs text-red-500", classes.error)}>
          {error}
        </div>
      )}
    </div>
  );
};

export const CheckboxInput = ({
  label,
  name,
  placeholder,
  onChange,
  value,
  classes = "",
  error,
  inputProps = {},
  required,
}) => {
  const controls = onChange
    ? { checked: value, onCheckedChange: onChange }
    : { defaultChecked: value };

  return (
    <div
      className={cn(
        "relative flex flex-col gap-1",
        typeof classes == "string" ? classes : classes.main
      )}
    >
      <label
        htmlFor={name}
        className={cn("text-sm", error && "text-red-500", classes.label)}
      >
        {placeholder} {required && <span className="text-red-400">{"*"}</span>}
      </label>
      <div
        className={cn(
          "relative flex items-center gap-2",
          classes.inputContainer
        )}
      >
        <Checkbox id={name} name={name} {...controls} {...inputProps} />
        <label
          htmlFor={name}
          className={cn("text-sm", error && "text-red-500", classes.label)}
        >
          {label}
        </label>
      </div>
      {error && (
        <div className={cn("error text-xs text-red-500", classes.error)}>
          {error}
        </div>
      )}
    </div>
  );
};

const mapping = {
  text: TypeInput,
  file: FileInput,
  select: SelectInput,
  textarea: TextareaInput,
  checkbox: CheckboxInput,
};

export const AllInput = ({
  inputs,
  formData,
  setFormData,
  errors,
  className,
  ...props
}) => {
  const [dismissErrors, setDismissErrors] = useState({});

  useEffect(() => {
    setDismissErrors({});
  }, [errors]);

  const generateProps = (input) => ({
    onChange(value) {
      setFormData?.((fd) => ({ ...fd, [input.name]: value }));
      if (!dismissErrors[input.name]) {
        setDismissErrors((sr) => ({ ...sr, [input.name]: true }));
      }
    },
    value: formData?.[input.name] ?? "",
    error: !dismissErrors[input.name] && errors?.[input.name],
    ...props,
    ...input,
  });

  const issueFields = Object.keys(errors || {}).filter(
    (k) => !dismissErrors[k]
  );

  return (
    <>
      {inputs.map((input, index) => {
        if (input.type == "flex") {
          const { type, items, ...itemProps } = input;
          return (
            <div
              key={"flex" + index}
              className={cn(
                "flex gap-4 *:basis-52 *:grow flex-wrap",
                className
              )}
            >
              {items.map((item) => {
                const InputElement = mapping[item.type] ?? mapping.text;
                return (
                  <InputElement
                    key={item.name}
                    {...generateProps({ ...itemProps, ...item })}
                  />
                );
              })}
            </div>
          );
        }

        const InputElement = mapping[input.type] ?? mapping.text;
        return (
          <div key={input.name} className={cn(className)}>
            <InputElement {...generateProps(input)} />
          </div>
        );
      })}

      {issueFields.length !== 0 && (
        <div className="error text-sm text-red-500">
          Some field(s) have issues.{" "}
          <em>{issueFields.slice(0, 3).join(", ")}...</em>
        </div>
      )}
    </>
  );
};
