"use client";

import SubmitButton from "@/components/buttons/SubmitButton";
import InputField from "@/components/form/InputField";
import { myFetch } from "@/utils/myFetch";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type ForgotPasswordInputs = {
  email: string;
};

const ForgotPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInputs>();

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async(data) => {
    //console.log(data);
    const res = await myFetch("/auth/forgot-password", {
      method: "POST",
      body: {
        email: data.email
      },
    });
    // console.log(res)

    if (res.success) {
      localStorage.setItem("userEmail", data?.email);
      router.push('/verify-otp')
    } else {
      // console.error(res?.message ?? "Failed!");
      alert(res?.message ?? "Failed!");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Enter you Email to get OTP
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <InputField title="Email Address" name="email" placeholder="example@mail.com" type="email" register={register} error={errors.email} />
            <SubmitButton isSubmitting={false} title="Get OTP" />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;