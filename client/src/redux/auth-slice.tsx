import {createSlice} from '@reduxjs/toolkit';

type AuthState = {
    isAuth: boolean;
    username : string;
    token? : string;
}

type initialState = {
    value: AuthState;
};

const initialState = {
        value: {
            isAuth:false,
            username:"",
            token:"",
        } as AuthState,
    } as initialState;


export const auth = createSlice({
    name:"auth",
    initialState,
    reducers: {
        print: () => {
            console.log(initialState);
        }
    }
})

export const {print} = auth.actions;
export default auth.reducer;