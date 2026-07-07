"use client";

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import SubmitButton from "@/components/buttons/SubmitButton";

type FilterForm = {
  searchTerm: string;
  category: string;
  minPrice: number | "";
  maxPrice: number | "";
  minStock: number | "";
  maxStock: number | "";
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryList: any[];
  onFilter: (query: string) => void;
}

const ProductFilterModal = ({
  open,
  onOpenChange,
  categoryList,
  onFilter,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FilterForm>({
    defaultValues: {
      searchTerm: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      minStock: "",
      maxStock: "",
    },
  });

  const onSubmit = (data: FilterForm) => {
    const params = new URLSearchParams();

    if (data.searchTerm)
      params.append("searchTerm", data.searchTerm);

    if (data.category)
      params.append("category", data.category);

    if (data.minPrice !== "")
      params.append("minPrice", String(data.minPrice));

    if (data.maxPrice !== "")
      params.append("maxPrice", String(data.maxPrice));

    if (data.minStock !== "")
      params.append("minStock", String(data.minStock));

    if (data.maxStock !== "")
      params.append("maxStock", String(data.maxStock));

    onFilter(params.toString());
    onOpenChange(false);
  };

  const handleReset = () => {
    reset();
    onFilter("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle><h1>Filter Products</h1></DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <InputField
            title="Search"
            name="searchTerm"
            type="text"
            register={register}
            error={errors.searchTerm}
          />

          <SelectField
            label="Category"
            name="category"
            control={control}
            options={categoryList}
            error={errors.category}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              title="Minimum Price"
              name="minPrice"
              type="number"
              register={register}
              error={errors.minPrice}
            />

            <InputField
              title="Maximum Price"
              name="maxPrice"
              type="number"
              register={register}
              error={errors.maxPrice}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              title="Minimum Stock"
              name="minStock"
              type="number"
              register={register}
              error={errors.minStock}
            />

            <InputField
              title="Maximum Stock"
              name="maxStock"
              type="number"
              register={register}
              error={errors.maxStock}
            />
          </div>

          <DialogFooter>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border px-5 py-2 hover:bg-gray-100"
            >
              Reset
            </button>

            <SubmitButton
              isSubmitting={false}
              title="Apply Filter"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFilterModal;