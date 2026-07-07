import { myFetch } from "@/utils/myFetch";
import Order from "./Order";

const page = async () => {
  const res = await myFetch("/order", {
    method: "GET",
    tags: ["orders"],
  });
  //console.log(res)
  
      
  return (
    <div>
      <Order orderData={res?.data} />
    </div>
  );
};

export default page;