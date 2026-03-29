import { api } from "./axios";
import { SignUpData, SignInData } from "../types/auth";

export async function signupApi(data: SignUpData){
    const response = await api.post("/auth/signup", data)
    return response.data
}

export async function signinApi(data: SignInData){
    const response = await api.post("/auth/signin", data)
    return response.data
}