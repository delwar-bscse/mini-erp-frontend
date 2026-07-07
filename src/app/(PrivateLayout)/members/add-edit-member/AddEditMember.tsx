"use client";

import SubmitButton from "@/components/buttons/SubmitButton";
import InputField from "@/components/form/InputField";
import InputFieldPassword from "@/components/form/InputFieldPassword";
import SelectField from "@/components/form/SelectField";
import { revalidate } from "@/helpers/revalidateHelper";
import { myFetch } from "@/utils/myFetch";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type AddEditMemberInputs = {
  name: string;
  email: string;
  role: string | null;
  password: string;
};

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AddEditMember = ({title, prevData}: {title: string, prevData?: UserData}) => {
    const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddEditMemberInputs>({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      password: "",
    },
  });

  useEffect(()=>{
    // console.log(prevData);
    if(prevData){
      reset({
      name: prevData?.name,
      email: prevData?.email,
      role: prevData?.role,
    })
    }
  },[]);

  const onSubmit: SubmitHandler<AddEditMemberInputs> = async(data) => {
    // console.log(data);
    const url = prevData?._id ? `/user/update-user/${prevData?._id}` : "/user"
    const method = prevData?._id ? "PATCH" : "POST"
    const res = await myFetch(url, {
      method: method,
      body: {
        name:data.name,
        email: data.email,
        role:data.role,
        ...(!prevData?._id ? {password: data.password} : {}),
      },
    });
    // console.log(res)

    if (res.success) {
      revalidate("members")
      router.push("/members");
    } else {
      alert(res?.message ?? "Failed!");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {title}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            <InputField title="Name" name="name" type="text" register={register} error={errors.name} />

            <InputField title="Email Address" name="email" type="email" register={register} error={errors.email} />

            <SelectField label="Role" name="role" control={control} error={errors.role} options={[
              { label: "Manager", value: "Manager" },
              { label: "Employee", value: "Employee" },
            ]} />
            
            {!prevData?._id && <InputFieldPassword isForgotPassword={true} title="Password" name="password" register={register} error={errors.password} />}
            
            <SubmitButton isSubmitting={false} title={prevData?._id ? "Update" : "Add"} />
        </form>
      </div>
    </div>
  );
};

export default AddEditMember;