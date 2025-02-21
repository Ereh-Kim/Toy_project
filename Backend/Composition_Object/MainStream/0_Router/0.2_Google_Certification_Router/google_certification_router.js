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
        redirect_uri: `https://www.foodscript.co.kr/login/google/redirect`,
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

    async Register_verified_UserInfo(userinfo, status, temporary, institution) {

    this.userinfo = userinfo
    this.status = status
    this.temporary_certification = temporary
    this.authorization = institution

    return this.userinfo}

    

    Manage_google_certification_Routes(){
    
    this.Pure_Router.get('/',(req,res)=>{
        
        let url = 'https://accounts.google.com/o/oauth2/v2/auth';
        url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`
        url += `&redirect_uri=https://www.foodscript.co.kr/login/google/redirect`
        url += `&response_type=code`
        url += `&scope=profile email`

        res.redirect(url)
    })



    this.Pure_Router.get('/redirect',async (req,res, next)=>{      
    
        
        const access_token = await this.Issue_Google_Access_Token(req.query.code)
        const UserInfo= await this.Get_UserInfo_From_AccessToken(access_token)

        const RequestOrigin = await req.session.url_history[req.session.url_history.length-1]
        let DB = new Account_Register_Router();
        console.log(RequestOrigin + ' this is link ')
        const Mulit = '/search/font/CuteMin.ttf'||'/search/static/css/main.1a823c04.css.map'||'/search/static/media/food_script_tabicon.5f9cb8eda6e2f9aa61c6.png'

        switch(RequestOrigin){
            case('/registeration/signup-with-google'):
            await this.Register_verified_UserInfo(UserInfo, 'verified', 'verified', 'google')
            
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
                        const approved_session = await fetch(`${process.env.DOMAIN}/googlelogin/sessionset`,{
                            method: 'PATCH'
                        })
                        const approved_session_data = await approved_session.json()
                        
                        req.session.data = approved_session_data.user_info
                        res.write(`<script>alert('${approved_session_data.message}')</script>`)
                        res.write(`<script>window.location=\"${approved_session_data.redirectUrl}\"</script>`);
                        res.end()
                    break;
                }
                break;

            case('/search/font/CuteMin.ttf'):
            const status = await DB.Check_User_Exist(['email'],[`${UserInfo.email}`])
                console.log(status)
                switch(status){

                    case('Need_Registeration'):
                    await this.Register_verified_UserInfo(UserInfo, 'unverified', 'verified', 'google')
                        
                        const temporary_session = await fetch(`${process.env.DOMAIN}/googlelogin/sessionset`,{
                            method: 'PATCH'
                        })
                        const temporary_session_data = await temporary_session.json()
                
                        req.session.data = temporary_session_data.user_info
                        res.write(`<script>alert('${temporary_session_data.message}')</script>`)
                        res.write(`<script>window.location=\"${temporary_session_data.redirectUrl}\"</script>`);
                        res.end()
                    return;

                    case('Account_already_exist'):
                    const Pre_Existed_AcccountData = await DB.Load_UserData(['email'],[`${UserInfo.email}`])
                    await this.Register_verified_UserInfo(Pre_Existed_AcccountData, 'verified', 'verified', 'foodscript(local)')
                        
                        const approved_session = await fetch(`${process.env.DOMAIN}/googlelogin/sessionset`,{
                            method: 'PATCH'
                        })
                        const approved_session_data = await approved_session.json()
                
                        req.session.data = approved_session_data.user_info
                        res.write(`<script>alert('${approved_session_data.message}')</script>`)
                        res.write(`<script>window.location=\"${approved_session_data.redirectUrl}\"</script>`);
                        res.end()
                    return;
                }
            return;

            default:
            await this.Register_verified_UserInfo(UserInfo, 'unverified', 'verified')
                
                const default_session = await fetch(`${process.env.DOMAIN}/googlelogin/sessionset`,{
                    method: 'PATCH'
                })
                const default_session_data = await default_session.json()
        
                req.session.data = default_session_data.user_info
                res.write(`<script>alert('${default_session_data.message}')</script>`)
                res.write(`<script>window.location=\"${default_session_data.redirectUrl}\"</script>`);
                res.end()
            return;
            

        }

        // res.send(RequestOrigin + ' <- this is link ' + access_token + ' <- this is token ' + UserInfo +' <- this is userobject ')
    })

    
        
   }

}

let google_certificater = new google_certification_router()
google_certificater.Manage_google_certification_Routes()
let Google_certificater_Routes = google_certificater.Pure_Router

export {Google_certificater_Routes, google_certificater}