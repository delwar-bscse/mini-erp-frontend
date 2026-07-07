"use client";

import { Pencil, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { myFetch } from "@/utils/myFetch";
import { useState } from "react";
import { revalidate } from "@/helpers/revalidateHelper";

const Category = ({categoryData}: any) => {
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
        <h2 className="text-xl font-bold text-gray-500">Category</h2>
        <div className="flex gap-2">
          <input value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="border p-2 rounded-md" placeholder="Enter category name"/>
          <button onClick={handleCategory} className="bg-gray-600 text-white px-4 py-2 rounded-md cursor-pointer">{selectedCategoryId ? "Update" : "Add"}</button>
        </div>
      </div>



        <div className="flex flex-wrap gap-2">
          {categoryData?.map((category:any) => {
            return (
              <div key={category._id} className="flex items-center justify-between gap-2 border px-2 py-1 rounded-sm">
                <p>{category.name}</p>
                <div className="flex items-center justify-end gap-2">
                  <button onClick={()=> {setSelectedCategoryId(category._id); setNewCategoryName(category.name)}}className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-gray-100 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all text-xs font-bold">
                  <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(category._id)} className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all text-xs font-bold">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
};

export default Category;