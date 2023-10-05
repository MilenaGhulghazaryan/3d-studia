import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetSubcategory = createAsyncThunk("get/subcategory", async (_, thunkAPI) => {
    try {
        const response = await axios.get(`http://localhost:3004/subcategory`)
        return response.data
    }
    catch (error) {
        console.log(error);
    }
})

export const addSubCategory = createAsyncThunk('category/addSubCategory', async (data, thunkAPI) => {
    try {
        const response = await axios.post(`http://localhost:3004/subcategory`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});


const SubcategorySlice = createSlice({
    name: "subcategory",
    initialState: {
        subcategory: [],
        loading: false,
        error: "",
        subcategoryId: null
    },
    extraReducers: {
        [GetSubcategory.pending]: (state) => {
            state.loading = true
        },
        [GetSubcategory.fulfilled]: (state, action) => {
            state.subcategory = action.payload
            state.loading = false
            state.error = ""
        },
        [GetSubcategory.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    },
    reducers: {
        setSubcategoryId: (state, action) => {
            state.subcategoryId = action.payload
        }
    }
})

export const { setSubcategoryId } = SubcategorySlice.actions
export default SubcategorySlice.reducer

