import { myFetch } from "@/utils/myFetch";
import AddEditMember from "./AddEditMember";

const page = async({searchParams}: any) => {
  const {id} = await searchParams;
  const res = await myFetch(`/user/users/${id}`, {
      method: "GET",
      tags: ["members"],
    });
    //console.log(res)
  const title = id ? "Edit Member" : "New Member"
  return (
    <div>
      <AddEditMember title={title} prevData={res.data}/>
    </div>
  );
};

export default page;