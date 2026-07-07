"use client";

import { Pencil, Trash2, Plus, Eye, Filter } from "lucide-react";
import Link from "next/link";
import { myFetch } from "@/utils/myFetch";
import { useState } from "react";
import { revalidate } from "@/helpers/revalidateHelper";
import ProductCard from "./ProductCard";
import ProductFilterModal from "@/components/modal/ProductFilterModal";
import { useRouter } from "next/navigation";

const Product = ({productData, categoryList}: any) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState("")

  const handleDelete = async (id: string) => {
    //console.log(id);
    const res = await myFetch(`/category/${id}`, {
      method: "DELETE"
    });
    //console.log(res)
    if(res.success){
      //console.log("Revalidate")
      // await revalidate("members")
      window.location.reload()
    }
  };

  const handleCategory = async () => {
    //console.log(selectedCategoryId);
    const url = selectedCategoryId ? `/category/${selectedCategoryId}` : '/category'
    const method = selectedCategoryId ? "PATCH" : "POST"
    const res = await myFetch(url, {
      method: method,
      body:{
        name:newCategoryName
      }
    });
    //console.log(res)
    if(res.success){
      //console.log("Revalidate")
      // await revalidate("categories")
      // setSelectedCategoryId("")
      // setNewCategoryName("")
      window.location.reload()
    }
  };


  return (
    <div className="flex flex-col gap-8 p-6 animate-in fade-in duration-500">

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-500">Products</h2>


          <div className="flex gap-2">
                   <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        <Filter className="h-4 w-4" />
        Filter Products
      </button>

      <ProductFilterModal
        open={open}
        onOpenChange={setOpen}
        categoryList={categoryList}
        onFilter={(query) => {
          router.push(`?${query}`);
        }}
      />
    </>
            <Link href="/product/add-product" className="bg-[#142d22] hover:bg-[#1a3a2e] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-[#142d22]/20 font-medium">
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </Link>
          <Link href="/product/view-cart" className="bg-[#142d22] hover:bg-[#1a3a2e] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-[#142d22]/20 font-medium">
            <Eye className="w-5 h-5" />
            <span>View Cart</span>
          </Link>
          </div>
      </div>


      


        <div className="flex flex-wrap gap-2">
          {productData?.map((category:any) => {
            return (
              <ProductCard key={category._id} product={category} />
            );
          })}
        </div>
    </div>
  );
};

export default Product;