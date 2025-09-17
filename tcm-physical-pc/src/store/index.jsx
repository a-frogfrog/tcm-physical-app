import { configureStore } from '@reduxjs/toolkit'

import countReducer from './modules/count';

import loginReducer from './modules/login'

const store = configureStore({
    reducer: {
        count: countReducer  //项目初始化时才会有这个count 
        , login: loginReducer
    }
});

export default store