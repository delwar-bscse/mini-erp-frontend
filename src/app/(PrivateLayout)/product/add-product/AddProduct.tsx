"use client";

import SubmitButton from "@/components/buttons/SubmitButton";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import { myFetch } from "@/utils/myFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type AddProductInputs = {
  name: string;
  sku: string;
  category: string;
  purchase_price: number;
  selling_price: number;
  stock_quantity: number;
};

const AddProduct = ({categoryList, prevProduct}:{categoryList:any[], prevProduct:any}) => {
  const router = useRouter();
  const [file,setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      file && setFile(file);
  }

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddProductInputs>({
    defaultValues:{
      name: prevProduct?.name || "",
      sku: prevProduct?.sku || "",
      category: categoryList.find((item: any) => item.value === prevProduct.category)?.label || "",
      purchase_price:prevProduct?.purchase_price || 0,
      selling_price:prevProduct?.selling_price || 0,
      stock_quantity:prevProduct?.stock_quantity || 0
    }
  });

  const onSubmit: SubmitHandler<AddProductInputs> = async(data) => {
    const payload:Partial<AddProductInputs> = {
      ...data,
      category:categoryList.find((item: any) => item.label === data.category)?.value,
      purchase_price:Number(data.purchase_price),
      selling_price:Number(data.selling_price),
      stock_quantity:Number(data.stock_quantity)
    }
    //console.log({data});
    //console.log({payload})
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    file && formData.append("image", file);
    
    const url = prevProduct?._id ? `/product/${prevProduct._id}` : '/product'
    const method = prevProduct?._id ? "PATCH" : "POST"

    const res = await myFetch(url, {
      method: method,
      body: formData,
    });
    
    //console.log({res})

    if (res.success) {
      router.push("/");
    } else {
      alert(res?.message ?? "Product added failed!");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {prevProduct?.name ? `Update Product` : "Add New Product"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <InputField title="Product Name" name="name"  type="text" register={register} error={errors.name} />
            <InputField title="Product SKU" name="sku" type="text" register={register} error={errors.sku} />
            <SelectField label="Category" name="category" control={control} error={errors.category} options={categoryList} />
            <InputField title="Product Purchase Price" name="purchase_price" type="number" register={register} error={errors.purchase_price} />
            <InputField title="Product Selling Price" name="selling_price" type="number" register={register} error={errors.selling_price} />
            <InputField title="Product Stock Quantity" name="stock_quantity" type="number" register={register} error={errors.stock_quantity} />
            <div>
             <label className="block text-[11px] font-bold tracking-[0.1em] text-gray-700 uppercase">Product Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="border-1 py-2 px-3 border-dashed border-gray-300 rounded-md cursor-pointer w-full" />
            </div>

            <SubmitButton isSubmitting={false} title={prevProduct?._id ? `Update Product` : "Add Product"} />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;