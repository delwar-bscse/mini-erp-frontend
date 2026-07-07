"use client";

import SubmitButton from "@/components/buttons/SubmitButton";
import InputField from "@/components/form/InputField";
import InputFieldPassword from "@/components/form/InputFieldPassword";
import { myFetch } from "@/utils/myFetch";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type SignInInputs = {
  email: string;
  password: string;
};

const SignIn = () => {
    const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs>();

  const onSubmit: SubmitHandler<SignInInputs> = async(data) => {
    //console.log(data);
    const res = await myFetch("/auth/login", {
      method: "POST",
      body: {
        email: data.email,
        password: data.password,
      },
    });
    // console.log(res)

    if (res.success) {
      setCookie("accessToken", res?.data?.accessToken);
      setCookie("refreshToken", res?.data?.refreshToken);
      setCookie("role", res?.data?.role);
      router.push("/");
    } else {
      alert(res?.message ?? "Login failed!");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <InputField title="Email Address" name="email" type="email" register={register} error={errors.email} />
            
            <InputFieldPassword isForgotPassword={true} title="Password" name="password" register={register} error={errors.password} />

            <SubmitButton isSubmitting={false} title="Sign In" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;