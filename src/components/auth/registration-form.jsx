"use client";
import React, { useEffect, useState } from "react";
import courses from "@/data/courses";
import { zones } from "@/data/zones";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { handleFormSubmitHelper } from "@/lib/form-utils";
import { Loader2, CloudUpload } from "lucide-react";
import ErrorDialog from "@/components/ui/error-dialog";
import SuccessDialog from "@/components/ui/success-dialog";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { registrationSchema } from "@/schema/auth.schema";

const FileInput = ({
  field,
  label,
  description,
  uploadLabel,
  fileTypes,
  error,
  required,
  classes,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (
      field.value &&
      field.value instanceof File &&
      field.value.type.startsWith("image")
    ) {
      const url = URL.createObjectURL(field.value);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreview(null);
    }
  }, [field.value]);

  return (
    <FormItem className={cn("relative flex flex-col gap-1", classes?.main)}>
      <FormLabel className={cn(error && "text-red-500", classes?.label)}>
        {label} {required && <span className="text-red-400">*</span>}
      </FormLabel>
      {description && <FormDescription>{description}</FormDescription>}
      <FormControl>
        <div className="relative">
          <Input
            type="file"
            accept={fileTypes?.join(",")}
            className="hidden"
            id={field.name}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) field.onChange(file);
            }}
          />
          <label
            htmlFor={field.name}
            className={cn(
              "input-area file-preview h-20 mt-2 rounded-lg text-sm flex flex-col justify-center items-center border border-input bg-background cursor-pointer hover:bg-accent/50 transition-colors",
              error && "border-red-500 text-red-500",
              classes?.input
            )}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="h-full object-contain"
              />
            ) : field.value ? (
              <p className="text-center p-2">{field.value.name}</p>
            ) : (
              <>
                <CloudUpload size={32} className="mb-1" />
                <span>{uploadLabel}</span>
              </>
            )}
          </label>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

const RegistrationForm = () => {
  const searchParams = useSearchParams();
  const [submitStatus, setSubmitStatus] = useState(null);
  const [rand, setRand] = useState(Math.random);

  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      course:
        courses.find((course) => course.id === searchParams.get("course"))
          ?.name ?? "",
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      phone: "",
      state: "",
      city: "",
      address: "",
      passportId: "",
      file: undefined,
      promoCode: "",
      agreement: false,
      regNo: "",
      province: "",
      TIC: "",
    },
  });

  const { watch, setValue } = form;
  const selectedCourse = watch("course");
  const selectedProvince = watch("province");

  useEffect(() => {
    if (!selectedCourse) return;

    const courseId = courses.find(
      (course) => course.name === selectedCourse
    )?.id;
    if (courseId) {
      setValue(
        "regNo",
        `ETSAP/SO/${courseId}/${Math.floor(rand * 90000 + 10000)}`
      );
    }
  }, [selectedCourse, rand, setValue]);

  const onSubmit = async (data) => {
    const resolvedFormData = { ...data };
    if (!resolvedFormData.promoCode) delete resolvedFormData.promoCode;

    await handleFormSubmitHelper({
      formSchema: registrationSchema,
      formData: resolvedFormData,
      endPoint: "/v1/auth/register",
      setSubmitStatus,
      onError(formStatus) {
        const issueField = Object.keys(data).find((formField) =>
          formStatus.error.includes(formField)
        );

        if (formStatus.error.includes("duplicate key") && issueField) {
          setSubmitStatus({
            ...formStatus,
            error: `User with ${issueField}: ${data[issueField]} already exists.`,
          });
        }
      },
    });

    if (submitStatus?.status === "success") {
      localStorage.setItem(
        "_auth",
        JSON.stringify(submitStatus?.response?.data?.user)
      );
    }
  };

  const commonInputClasses =
    "py-6 border-0 shadow-none rounded-none focus-visible:ring-0 border-b border-neutral-500";

  const alreadyRegistered = (
    <Link
      href="/auth/payment"
      className="text-center text-blue-400 hover:underline"
    >
      Already registered? Continue your application process
    </Link>
  );

  return (
    <div className="section">
      <div className="container mx-auto">
        <h1 className="text-3xl text-center mb-12">Registration Form</h1>
        <div className="max-w-[800px] mx-auto flex flex-col gap-4">
          {alreadyRegistered}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-4 rounded-lg bg-neutral-50 border"
            >
              {/* Course */}
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Select a course <span className="text-red-400">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={commonInputClasses}>
                          <SelectValue placeholder="Select a course you want to register for" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.name} value={course.name}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Reg No */}
              <FormField
                control={form.control}
                name="regNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Unique Reg Number <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="This will automatically be generated for you"
                        {...field}
                        readOnly
                        className={cn(
                          commonInputClasses,
                          "italic cursor-not-allowed"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Name Fields */}
              <div className="flex gap-4 *:basis-52 *:grow flex-wrap">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        First name <span className="text-red-400">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter first name"
                          {...field}
                          className={commonInputClasses}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Last name <span className="text-red-400">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter last name"
                          {...field}
                          className={commonInputClasses}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email Address <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className={commonInputClasses}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Gender <span className="text-red-400">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={commonInputClasses}>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Non-binary</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
                        {...field}
                        className={commonInputClasses}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* State */}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      State/Country <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your state or country residence"
                        {...field}
                        className={commonInputClasses}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Zone Field */}
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Zone <span className="text-red-400">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={commonInputClasses}>
                          <SelectValue placeholder="Select a Zone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(zones).map((zone) => (
                          <SelectItem key={zone} value={zone}>
                            {zone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* TIC Field */}
              {selectedProvince && (
                <FormField
                  control={form.control}
                  name="TIC"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Zone TIC Code <span className="text-red-400">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className={commonInputClasses}>
                            <SelectValue placeholder="Select a TIC Code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(zones[selectedProvince] || {}).map(
                            ([state, code]) => (
                              <SelectItem key={code} value={`${state}-${code}`}>
                                {state}-{code}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* City */}
              {/* <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      City <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your City of residence"
                        {...field}
                        className={commonInputClasses}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Address <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your address"
                        {...field}
                        className={commonInputClasses}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ID Type */}
              <FormField
                control={form.control}
                name="passportId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      ID Type <span className="text-red-400">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={commonInputClasses}>
                          <SelectValue placeholder="Enter ID Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Passport">Passport</SelectItem>
                        <SelectItem value="National ID">National ID</SelectItem>
                        <SelectItem value="Guadian ID">Guadian ID</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* File Upload */}
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FileInput
                    field={field}
                    label="ID File"
                    description="Note: Only png, jpg and pdf files are allowed. Maximum file size is 5MB"
                    uploadLabel="Upload an image of your ID"
                    fileTypes={[
                      "image/png",
                      "image/jpeg",
                      "image/jpg",
                      "application/pdf",
                    ]}
                    required={true}
                    error={form.formState.errors.file?.message}
                  />
                )}
              />

              {/* Promo Code */}
              <FormField
                control={form.control}
                name="promoCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promo Code (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Promo Code"
                        {...field}
                        className={commonInputClasses}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Agreement */}
              <FormField
                control={form.control}
                name="agreement"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree <span className="text-red-400">*</span>
                      </FormLabel>
                      <FormDescription>
                        Skillonline will use your data only for application
                        processing and onboarding purposes.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {submitStatus?.status === "form_error" && (
                <div className="text-red-500 text-sm">{submitStatus.error}</div>
              )}

              <Button
                size="xl"
                className="w-full mt-6"
                type="submit"
                disabled={
                  form.formState.isSubmitting ||
                  submitStatus?.status === "submitting"
                }
              >
                Register
                {(form.formState.isSubmitting ||
                  submitStatus?.status === "submitting") && (
                  <Loader2 className="animate-spin ml-2" />
                )}
              </Button>
            </form>
          </Form>

          {alreadyRegistered}
        </div>
      </div>

      <SuccessDialog
        open={submitStatus?.status === "success"}
        onOpenChange={() => setSubmitStatus(null)}
        title="Registration Successful"
        body={
          <>
            Thank you for registering with us, we are excited that you have
            taken this milestone step towards acquiring you tech emerging skill,
            we are currently processing your application so you&apos;ll receive
            your admission letter and your onboarding details shortly.
            <br />
            <br />
            <em>Signed SkillOnline ETSAP Onboarding team</em>
          </>
        }
        controls={
          <Button className="mx-auto">
            <Link href={`/auth/payment?email=${form.getValues("email")}`}>
              Proceed to payment
            </Link>
          </Button>
        }
      />
      <ErrorDialog
        open={submitStatus?.status === "error"}
        onOpenChange={() => setSubmitStatus(null)}
        title="Registration Failed"
        description={
          submitStatus?.error ||
          "An Error Occured. Try again. If error persists, contact us."
        }
        classes={{ body: "text-center" }}
      />
    </div>
  );
};

export default RegistrationForm;
