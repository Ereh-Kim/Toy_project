import Pure_Router from "../0.0_Pure_Router/pure_router.js";

import Database_Router_CAM from "../0.6_DataBase_Router_ClinetAccountManager/database_router_CAM.js";

class Local_Certification_Router extends Pure_Router {

constructor(){
super()
}

async Load_UserData(request, input){

let DB = await new Database_Router_CAM()
let result = await DB.Select_User(request, input)

return result
}

async Register_verified_UserInfo(userinfo) {

this.userinfo = userinfo
this.status = 'verified'
this.authorization = 'foodscript(local)'

return this.userinfo
}

async Register_rejection(){

this.status = 'unverified'
this.authorization = 'rejected'

}

async Check_User_Exist(verify_list, input){

let result = await this.Load_UserData(verify_list, input)
   switch(typeof result){
      case('undefined'):
      result = 'undefined_user_accessed'
      break;

      case('object'):
      break;
   }
   return result;
}




Manage_local_certification_Routes(){

this.Pure_Router.post('/',async (req,res)=>{   
   let condition = await this.Check_User_Exist(['email','password'],[`${req.body.email}`,`${req.body.password}`])

   switch(condition){
      case('undefined_user_accessed'):
      await this.Register_rejection()
      
      const rejected_session = await fetch(`${process.env.DOMAIN}/loginrejected/sessionset`,{
         method: 'PATCH'
      })
      const rejected_session_data = await rejected_session.json()

      req.session.data = rejected_session_data.user_info
      res.write(`<script>alert('${rejected_session_data.message}')</script>`)
      res.write(`<script>window.location=\"${rejected_session_data.redirectUrl}\"</script>`);
      res.end()
      return;

      default:
      let userinfo = condition
      await this.Register_verified_UserInfo(userinfo)
      
      const approved_session = await fetch(`${process.env.DOMAIN}/locallogin/sessionset`,{
         method: 'PATCH'
      })
      console.log(approved_session)
      const approved_session_data = await approved_session.json()
      console.log(approved_session_data)
      
      req.session.data = approved_session_data.user_info
      res.write(`<script>alert('${approved_session_data.message}')</script>`)
      res.write(`<script>window.location=\"${approved_session_data.redirectUrl}\"</script>`);
      res.end()
      break;
   }

   })


}

}

let local_certificater = new Local_Certification_Router()
local_certificater.Manage_local_certification_Routes()

let Local_Certificater_Routes = local_certificater.Pure_Router
export {Local_Certificater_Routes, local_certificater};