import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetIcons = createAsyncThunk("get/icons", async (_, thunkAPI) => {
    try {
        const response = await axios.get(` http://localhost:3004/icons `)
        return response.data
    }
    catch (error) {
        console.log(error);
    }
})

export const addNewImage = createAsyncThunk('post/newImages', async (data, thunkAPI) => {
    try {
        const response = await axios.post(` http://localhost:3004/icons`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

const IconsSlice = createSlice({
    name: "icons",
    initialState: {
        icons: [],
        loading: false,
        error: "",
        categoryId: null,
        colorArr: []
    },
    extraReducers: {
        [GetIcons.pending]: (state) => {
            state.loading = true
        },
        [GetIcons.fulfilled]: (state, action) => {
            state.icons = action.payload
            state.colorArr = action.payload
            state.loading = false
            state.error = ""
        },
        [GetIcons.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    },
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload
        },
        changeIcons: (state, action) => {
            state.icons = action.payload
        }
    }
})

export const { setCategoryId, changeIcons } = IconsSlice.actions
export default IconsSlice.reducer

