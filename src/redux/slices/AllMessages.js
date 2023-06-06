import { createSlice } from '@reduxjs/toolkit';
 const AllMessages = createSlice({
    name: "AllMessages",
    initialState: [] ,
    reducers: {
        GetAll : (state,action)=> {
             return action.payload;
        },
    }
})
export const GetAllMessages = AllMessages.actions
export default AllMessages.reducer;