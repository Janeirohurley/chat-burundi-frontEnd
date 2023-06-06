import { createSlice } from '@reduxjs/toolkit';
 const AllNotifications = createSlice({
    name: "notifications",
    initialState: [] ,
    reducers: {
        Notifier : (state,action)=> {
             return action.payload;
        },
    }
})
export const GetAllNotifications = AllNotifications.actions
export default AllNotifications.reducer;