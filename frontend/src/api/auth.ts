import { api } from "./axios";
import { SignUpData, SignInData } from "../types/auth";

export async function signupApi(data: SignUpData){
    const response = await api.post("/signup", data)
    return response.data
}

export async function signinApi(data: SignInData){
    const response = await api.post("/signin", data)
    return response.data
}