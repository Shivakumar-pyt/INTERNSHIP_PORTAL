import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user",
    initialState: {
        isLogged: false,
        email: "",
        username: "",
        password: "",
        account_type: "",
    },
    reducers: {
        loggedIn: (state,action) => {
            state.isLogged = true;
            state.username = action.payload.username;
            state.password = action.payload.password;
            state.account_type = action.payload.account_type;
        },

        loggedOut: (state) => {
            state.isLogged = false;
            state.username = "";
            state.account_type = "";
        },
    }
})

export const { loggedIn, loggedOut } = userSlice.actions;
export default userSlice.reducer;