import type { FieldError } from "react-hook-form";
import { forwardRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type InputFormProps = React.ComponentProps<"input"> & {
  label: string;
  error?: FieldError | undefined;
};

const InputForm = forwardRef(
  (
    { label, error, ...props }: InputFormProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <fieldset className="flex flex-col mb-4 gap-3">
          <Label htmlFor={props.id}>{label}</Label>
          <Input {...props} ref={ref} />
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-semibold text-xs h-2 text-center">
              {error?.message}
            </span>
          </div>
        </fieldset>
      </>
    );
  }
);

export default InputForm;
