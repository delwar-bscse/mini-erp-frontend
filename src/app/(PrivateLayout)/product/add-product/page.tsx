import { myFetch } from "@/utils/myFetch";
import AddProduct from "./AddProduct";

const page = async ({searchParams}:any) => {  
  const {id} = await searchParams
  //console.log(id)
  const productRes = await myFetch(`/product/${id}`, {
    method: "GET",
    tags: ["product"],
  });
  //console.log("productRes", productRes);

  const res = await myFetch("/category/", {
    method: "GET",
    tags: ["categories"],
  });
  const categoryList = res?.data.map((item:any)=>{
    return {
      label: item.name,
      value: item._id
    }
  })
  //console.log(categoryList)

  return (
    <div>
      <AddProduct categoryList={categoryList} prevProduct={productRes?.data} />
    </div>
  );
};

export default page;