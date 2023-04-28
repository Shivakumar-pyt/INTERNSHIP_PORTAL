import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user",
    initialState: {
        isLogged: false,
        email: "",
        username: "",
        password: "",
    },
    reducers: {
        loggedIn: (state,action) => {
            state.isLogged = true;
            state.username = action.payload.username;
            state.password = action.payload.password;
        },

        loggedOut: (state) => {
            state.isLogged = false;
            state.username = "";
        },
    }
})

export const { loggedIn, loggedOut } = userSlice.actions;
export default userSlice.reducer;