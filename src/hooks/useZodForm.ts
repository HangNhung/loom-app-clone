import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { ZodSchema } from "zod";

const useZodForm = (
  schema: ZodSchema,
  mutation: UseMutateFunction,
  defaultValue?: unknown
) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValue,
  });

  const onFormSubmit = handleSubmit((data) => {
    mutation({ ...data });
  });

  return {
    register,
    watch,
    reset,
    onFormSubmit,
    errors,
  };
};

export default useZodForm;
