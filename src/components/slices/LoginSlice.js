import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//middleware
export const userLogin = createAsyncThunk("user/login", async (userObj, { rejectWithValue }) => {
    console.log("user object in slice", userObj);
    try {
        let res = await axios.post("http://localhost:4000/user/login", userObj)
        //store token in local/session storage
        console.log("res is", res);

        //save token in session storage
        if (res.data.message === 'Login success') {
            sessionStorage.setItem("token", res.data.token)
            //store userObj in local storage
            localStorage.setItem("userObj", JSON.stringify(res.data.user))
            localStorage.setItem("status", "success")
            return res.data;
        }
        else {
            // console.log("res.data.message", res.data.message)
           
            throw new Error(res.data.message)
        }

    }
    catch (err) {
        console.log("err", err);
        return rejectWithValue(err.response.data.message)
    }


})
//get the variables
//user information
let user = localStorage.getItem("userObj")
if (!user) {
    user = {}
} else {
    user = JSON.parse(user)
}

//user login status
let status = localStorage.getItem("status")
if (!status) {
    status = "idle";
}

//create slice
export const loginSlice = createSlice({
    name: "login",
    initialState: {
        userObj: user,
        userLoginStatus: false,
        errorMessage: "",
        status: status
    },
    reducers: {
        clearState: (state, action) => {
            //remove from local storage
            localStorage.removeItem("userObj")
            localStorage.removeItem("status")
            sessionStorage.clear()

            //clearing state
            state.userObj = {}
            state.userLoginStatus = false
            state.errorMessage = ""
            state.status = "idle"
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state, action) => {
            state.status = "pending"

        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.userObj = action.payload.user;
            state.userLoginStatus = true;
            state.status = "success"
            state.errorMessage = ""

        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.status = "failed"
            state.errorMessage = action.payload
            state.userLoginStatus = false
        })

    }

})
export const { clearState } = loginSlice.actions

export default loginSlice.reducer
