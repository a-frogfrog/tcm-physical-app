import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './modules/login';

// 创建 Redux store
export const store = configureStore({
  reducer: {
    login: loginReducer,
    // 可以在这里添加其他 reducer
  },
  // 可选：添加中间件或增强器
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略非序列化值的警告（如函数）
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;