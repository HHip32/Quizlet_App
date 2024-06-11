import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'data',
  initialState: {
    user: {
          "id": 1,
          "name": "Nguyen Van A",
          "email": "vana@example.com",
          "password": "hashed_password",
          "dob": "1990-01-01",
          "isGv": false
      },
    start:'HocPhanTab',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setStart: (state, action) => {
      // Ánh xạ giá trị từ 0, 1, 2 thành 'HocPhanTab', 'LopHocTab', 'ThuMucTab'
      const mapping = ['HocPhanTab', 'LopHocTab', 'ThuMucTab'];
      state.start = mapping[action.payload] || state.start;
    },
  },
});

export const {  setUser,setStart } = userSlice.actions;
export const selectUser = (state) => state.data.user;
export const selectStart = (state) => state.data.start;
export default userSlice.reducer;