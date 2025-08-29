/**
 * 导入Redux Toolkit中的createSlice函数，用于创建Redux切片
 * 导入认证相关的工具函数：get_token, set_token
 * 导入登录API函数：login
 */
import { createSlice } from "@reduxjs/toolkit";
import { get_token, set_token } from "../../utils/auth";
import { logins } from "../../api/Login"; // 注意大小写问题

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: get_token() || "",
  },
  reducers: {
    // 修改reducer名称以避免冲突
    setToken(state, action) {
      state.token = action.payload;
      // 调用set_token函数保存token
      set_token(action.payload);
    },
  },
});

// 从actions中解构出setToken
const { setToken } = loginSlice.actions;

const loginSync = (obj) => {
  return async (dispatch) => {
    const res = await logins(obj);
    if (res.code === 0) {
      dispatch(setToken(res.data.token));
    }
    return res;
  };
};

// 导出loginSync
export { loginSync };

export default loginSlice.reducer;