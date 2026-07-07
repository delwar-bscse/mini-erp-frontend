"use client";

import SubmitButton from "@/components/buttons/SubmitButton";
import InputFieldPassword from "@/components/form/InputFieldPassword";
import { myFetch } from "@/utils/myFetch";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type ResetPasswordInputs = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>();

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async(data) => {
    const authToken = localStorage.getItem("authToken") || "";
    //console.log(data, authToken);
    const res = await myFetch("/auth/reset-password", {
      method: "POST",
      body: {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      },
      headers: {
        Authorization: authToken
      },
    });
    // console.log(res)

    if (res.success) {
      router.push('/sign-in');
    } else {
      // console.error(res?.message ?? "Failed!");
      alert(res?.message ?? "Failed!");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            <InputFieldPassword isForgotPassword={true} title="New Password" name="newPassword" register={register} error={errors.newPassword} />
            <InputFieldPassword isForgotPassword={true} title="Confirm Password" name="confirmPassword" register={register} error={errors.confirmPassword} />

            <SubmitButton isSubmitting={false} title="Reset Password" />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;