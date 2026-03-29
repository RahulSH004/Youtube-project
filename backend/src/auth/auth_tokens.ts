import 'dotenv/config';
import  jwt  from 'jsonwebtoken';
// implement access token and refresh token both

export const access_token = process.env.ACCESS_TOKEN as string;
export async function generateaccesstoken(user_id: string){
    const accesstoken = jwt.sign(
        {user_id}, 
        access_token, 
        {expiresIn: '1h', algorithm: 'HS256'})
    return (accesstoken);
}
