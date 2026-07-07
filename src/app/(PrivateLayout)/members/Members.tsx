"use client";

import { Pencil, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { myFetch } from "@/utils/myFetch";

const Members = ({membersData}: any) => {

  const handleDelete = async (id: string) => {
    //console.log(id);
    const res = await myFetch(`/user/delete-user/${id}`, {
      method: "DELETE"
    });
    //console.log(res)
    if(res.success){
      //console.log("Revalidate")
      // await revalidate("members")
      window.location.reload()
    }
  };


  return (
    <div className="flex flex-col gap-8 p-6 animate-in fade-in duration-500">

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-500">Members</h2>
          <Link href="/members/add-edit-member" className="bg-[#142d22] hover:bg-[#1a3a2e] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-[#142d22]/20 font-medium">
          <Plus className="w-5 h-5" />
          <span>Add Member</span>
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Role</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {membersData?.map((member:any) => {

              return (
                <tr key={member._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 text-gray-500 font-sm">{member.name}</td>
                  <td className="px-6 py-5 text-gray-500 font-sm">{member.email}</td>
                  <td className="px-6 py-5 text-gray-500 font-sm">{member.role}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/members/add-edit-member?id=${member._id}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-100 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all text-xs font-bold">
                        <Pencil className="w-3.5 h-3.5" />
                      </Link>
                      <button onClick={() => handleDelete(member._id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all text-xs font-bold">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;