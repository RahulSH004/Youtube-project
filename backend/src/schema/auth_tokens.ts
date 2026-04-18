import 'dotenv/config';
import  jwt  from 'jsonwebtoken';
// implement access token and refresh token both

export const access_token = process.env.ACCESS_TOKEN as string;
export async function generateaccesstoken(user_id: string){
    const accesstoken = jwt.sign(
        {id: user_id}, 
        access_token, 
        {expiresIn: '24h', algorithm: 'HS256'})
    return (accesstoken);
}
