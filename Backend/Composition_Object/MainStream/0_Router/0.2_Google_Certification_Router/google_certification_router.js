import Pure_Router from "../0.0_Pure_Router/pure_router.js";

import { Account_Register_Router } from "../0.8_Account_Register_Router/account_register_router.js";

import { Password_Genarator } from "../0.10_Tools/0.10.1_Password_Genagrator_API/password_genarator_api.js";
import { File_Reader } from "../0.10_Tools/0.10.2_File_Reader_API/file_reader.js";

import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export class google_certification_router extends Pure_Router {

    constructor(){
    super()
    }

    async Issue_Google_Access_Token(code){
    
    let url = 'https://oauth2.googleapis.com/token'

    let Access_Token_Request = await axios.post(url,{
        code: `${code}`,
        client_id: `${process.env.GOOGLE_CLIENT_ID}`,
        client_secret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        redirect_uri: `http://localhost:8080/login/google/redirect`,
        grant_type: 'authorization_code',
    })

    let Access_Token = Access_Token_Request.data.access_token

    return Access_Token}

    async Get_UserInfo_From_AccessToken(access_code) {

    let url = 'https://www.googleapis.com/oauth2/v2/userinfo'

    let UserInfo_Request = await axios.get(url, {
        headers : {
            Authorization: `Bearer ${access_code}`
        }})

    let UserInfo = UserInfo_Request.data

    return UserInfo}

    async Register_verified_UserInfo(userinfo, status, temporary) {

    this.userinfo = userinfo
    this.status = status
    this.temporary_certification = temporary
    this.authorization = 'google'

    return this.userinfo}




    Manage_google_certification_Routes(){
    
    this.Pure_Router.get('/',(req,res)=>{
        
        let url = 'https://accounts.google.com/o/oauth2/v2/auth';
        url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`
        url += `&redirect_uri=http://localhost:8080/login/google/redirect`
        url += `&response_type=code`
        url += `&scope=email profile`

        res.redirect(url)
    })



    this.Pure_Router.get('/redirect',async (req,res, next)=>{      
    
        const access_token = await this.Issue_Google_Access_Token(req.query.code)
        const UserInfo= await this.Get_UserInfo_From_AccessToken(access_token)

        const RequestOrigin = await req.session.url_history[req.session.url_history.length-1]
        let DB = new Account_Register_Router();

        console.log(RequestOrigin)
        switch(RequestOrigin){
            case('/registeration/signup-with-google'):
            await this.Register_verified_UserInfo(UserInfo, 'verified', 'verified')
            
            let password_genarator = new Password_Genarator();
            let file_reader = new File_Reader();



            let condition = await DB.Create_NewUser(UserInfo.email, 
                [`${UserInfo.email}`,
                 `${UserInfo.name}`,
                  await file_reader.read_file(`./public/Profile_Stranger_icon.jpg`),
                  `${password_genarator.genarate_password(8)}`,
                  `reviewer`])
            
            switch(condition){
                
                case('Need_To_Find'):
                res.redirect('/login')
                return;

                default:
                res.redirect('/googlelogin/sessionset')
                break;
            }
            break;

            case('/login/google'):
            const status = await DB.Check_User_Exist(['email'],[`${UserInfo.email}`])
                console.log(status)
                switch(status){

                    case('Need_Registeration'):
                    await this.Register_verified_UserInfo(UserInfo, 'unverified', 'verified')
                    res.redirect('/googlelogin/sessionset')
                    return;

                    case('Account_already_exist'):
                    await this.Register_verified_UserInfo(UserInfo, 'verified', 'verified')
                    res.redirect('/googlelogin/sessionset')
                    return;
                }
            return;

            default:
            await this.Register_verified_UserInfo(UserInfo, 'unverified', 'unverified')
            res.redirect('/googlelogin/sessionset')
            return;
            

        }
        

    })

    
        
   }

}

let google_certificater = new google_certification_router()
google_certificater.Manage_google_certification_Routes()
let Google_certificater_Routes = google_certificater.Pure_Router

export {Google_certificater_Routes, google_certificater}