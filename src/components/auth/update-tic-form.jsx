"use client";
import React, { useState } from "react";
import { zones } from "@/data/zones";
import { Button } from "@/components/ui/button";
import { handleFormSubmitHelper } from "@/lib/form-utils";
import { Loader2 } from "lucide-react";
import ErrorDialog from "@/components/ui/error-dialog";
import SuccessDialog from "@/components/ui/success-dialog";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTicSchema } from "@/schema/auth.schema";

const UpdateTicForm = () => {
  const [submitStatus, setSubmitStatus] = useState(null);

  const form = useForm({
    resolver: zodResolver(updateTicSchema),
    defaultValues: {
      regNo: "",
      province: "",
      TIC: "",
    },
  });

  const { watch, control, handleSubmit, formState } = form;
  const selectedProvince = watch("province");

  const onSubmit = async (data) => {
    await handleFormSubmitHelper({
      formSchema: updateTicSchema,
      method: "PATCH",
      formData: data,
      endPoint: "/v1/auth/update-tic",
      axiosConfig: {
        headers: {
          "Content-Type": "application/json",
        },
      },
      setSubmitStatus,
    });
  };

  const commonInputClasses =
    "py-6 border-0 shadow-none rounded-none focus-visible:ring-0 border-b border-neutral-500";

  return (
    <div className="section">
      <div className="container mx-auto">
        <h1 className="text-3xl text-center mb-12">Update TIC Details</h1>
        <div className="max-w-[800px] mx-auto flex flex-col gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-4 rounded-lg bg-neutral-50 border"
          >
            {/* Reg No */}
            <Controller
              control={control}
              name="regNo"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>
                    Registration Number <span className="text-red-400">*</span>
                  </FieldLabel>
                  <Input
                    placeholder="Enter your Registration Number"
                    {...field}
                    className={commonInputClasses}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            {/* Zone Field */}
            <Controller
              control={control}
              name="province"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>
                    Zone <span className="text-red-400">*</span>
                  </FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger className={commonInputClasses}>
                      <SelectValue placeholder="Select a Zone" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(zones).map((zone) => (
                        <SelectItem key={zone} value={zone}>
                          {zone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            {/* TIC Field */}
            {selectedProvince && (
              <Controller
                control={control}
                name="TIC"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>
                      Zone TIC Code <span className="text-red-400">*</span>
                    </FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className={commonInputClasses}>
                        <SelectValue placeholder="Select a TIC Code" />
                      </SelectTrigger>
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
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            )}

            {submitStatus?.status === "form_error" && (
              <div className="text-red-500 text-sm">{submitStatus.error}</div>
            )}

            <Button
              size="xl"
              className="w-full mt-6"
              type="submit"
              disabled={
                formState.isSubmitting || submitStatus?.status === "submitting"
              }
            >
              Update Details
              {(formState.isSubmitting ||
                submitStatus?.status === "submitting") && (
                <Loader2 className="animate-spin ml-2" />
              )}
            </Button>
          </form>

          <Link
            href="/auth/register"
            className="text-center text-blue-400 hover:underline"
          >
            Back to Registration
          </Link>
        </div>
      </div>

      <SuccessDialog
        open={submitStatus?.status === "success"}
        onOpenChange={() => setSubmitStatus(null)}
        title="Update Successful"
        description={
          submitStatus?.response?.data.message ||
          "Your TIC details have been successfully updated"
        }
        controls={
          <Button className="mx-auto" onClick={() => setSubmitStatus(null)}>
            Close
          </Button>
        }
      />
      <ErrorDialog
        open={submitStatus?.status === "error"}
        onOpenChange={() => setSubmitStatus(null)}
        title="Update Failed"
        description={
          submitStatus?.error ||
          "An Error Occured. Try again. If error persists, contact us."
        }
        classes={{ body: "text-center" }}
      />
    </div>
  );
};

export default UpdateTicForm;
