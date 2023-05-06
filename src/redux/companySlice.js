import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState: {
        username: "",
        company_data: {}
    },

    reducers: {
        setCompanyData: (state,action) => {
            state.username = action.payload.username;
            state.company_data = action.payload.company_data;
        }
    }
})

export const { setCompanyData } = companySlice.actions;
export default companySlice.reducer;