
import { EUserRole } from "@/types/types";
import { cookies } from "next/headers";

export const getUserRole = async(): Promise<string | null> => {
  const cookieStore = await cookies();
  const userRole: any = cookieStore.get("role")?.value || null;

  return userRole;
}

export const getUserRoleAdmin = async(): Promise<boolean> => {
  
  const result: boolean = await getUserRole() === EUserRole.ADMIN;
  return result;
}

export const getUserRoleManager = async(): Promise<boolean> => {
  
  const result: boolean = await getUserRole() === EUserRole.MANAGER;
  return result;
}

export const getUserRoleEmployee = async(): Promise<boolean> => {
  
  const result: boolean = await getUserRole() === EUserRole.EMPLOYEE;
  return result;
}