import { createSelector } from "@reduxjs/toolkit";
const adminData = (state) => {
    const adminData = state?.auth?.admin || {};
    return adminData;
}
export const getToken = (state) => {
    
    const token = state?.auth?.token || "";
    return token;
}

export const getAdminData = createSelector([adminData], a => a)
