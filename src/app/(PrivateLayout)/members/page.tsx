import { myFetch } from "@/utils/myFetch";
import Members from "./Members";

const page = async () => {
  const res = await myFetch("/user/users/", {
    method: "GET",
    tags: ["members"],
  });
  //console.log(res)
  
      
  return (
    <div>
      <Members membersData={res.data}/>
    </div>
  );
};

export default page;