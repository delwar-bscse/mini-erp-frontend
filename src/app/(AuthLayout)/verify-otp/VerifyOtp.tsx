"use client";

import SubmitButton from "@/components/buttons/SubmitButton";
import InputField from "@/components/form/InputField";
import { myFetch } from "@/utils/myFetch";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type VerifyOtpInputs = {
  otp: string;
};

const VerifyOtp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpInputs>();

  const onSubmit: SubmitHandler<VerifyOtpInputs> = async(data) => {
    const userEmail = localStorage.getItem("userEmail") || ""
    //console.log(userEmail, Number(data.otp));
    const res = await myFetch("/auth/verify-email", {
      method: "POST",
      body: {
        email: userEmail,
        oneTimeCode: Number(data.otp)
      },
    });
    // console.log(res)

    if (res.success) {
      localStorage.setItem("authToken", res?.data?.token);
      router.push('/reset-password')
    } else {
      // console.error(res?.message ?? "Failed!");
      alert(res?.message ?? "Failed!");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Verify Your OTP
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <InputField title="Enter Otp" name="otp" placeholder="234123" type="text" register={register} error={errors.otp} />
            <SubmitButton isSubmitting={false} title="Verify" />
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;