"use client";
import { EUserRole } from "@/types/types";
import { getCookie } from "cookies-next";


export const getUserRole = () => {
  const userRole: any = getCookie("role") || null;
  return userRole;
}

export const getUserRoleAdmin = (): boolean => {

  const result: boolean = getUserRole() === EUserRole.ADMIN;
  return result;
}

export const getUserRoleManager = (): boolean => {

  const result: boolean = getUserRole() === EUserRole.MANAGER;
  return result;
}

export const getUserRoleEmployee = (): boolean => {
  
  const result: boolean = getUserRole() === EUserRole.EMPLOYEE;
  return result;
}