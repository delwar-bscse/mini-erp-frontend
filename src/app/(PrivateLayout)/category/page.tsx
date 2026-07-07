import { myFetch } from "@/utils/myFetch";
import Category from "./Category";

const page = async () => {
  const res = await myFetch("/category/", {
    method: "GET",
    tags: ["categories"],
  });
  //console.log(res)
  
      
  return (
    <div>
      <Category categoryData={res?.data} />
    </div>
  );
};

export default page;