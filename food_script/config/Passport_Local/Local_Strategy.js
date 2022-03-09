var LocalStrategy = require('passport-local').Strategy;
const { pool } = require("../db_config/db_config.js");


function Initializing_Process(passport) {

        //-------Defining_Authenticating_Process-----------//
    var Authenticating_Process = 

            //-------*_Authentiate_starting----------------//    
    function 
        (id,password,done){
        
            // console.log('Authenticating_Process_Activate');

            //-------1_Checking User By Post_--------------//
                    pool.query(
                    'Select * from user_section.user_data where id =$1',
                    [id],
                    
                    //--1.A_Loading Compare_User from db---//
                    //--ㄴ>(Positive_Result)---------------//
                    (err, res)=>{
                    if(typeof res.rows[0] != 'undefined' ){
                    var Checked_user = res.rows[0]

            //-----A.a_Case: Password && id (True) ---------//

            if( Checked_user.id === id){
            if( Checked_user.password === password){
            return done(null,Checked_user)}

            //-----A.b_Case: Password (False) -------------//

            else{
                return done(null,false,{
                    message: 'Wrong Password Submitted'})
            }}}

                     //--1.B_Not Registered_User --------//
                     //--ㄴ>(Negative_Result)------------//
                    else{
                        return done(null,false,{message: 'Wrong User Submitted...'})
                    }

            }
        )
    }

    //------------------------------------------------Strategy_Define-------------------------------!!
    
    passport.use(
        new LocalStrategy(

            //-----Setting Post_Value as Perameter ------//
            {usernameField: 'id',passwordField: 'password'},

            //--Adding Process--//
            Authenticating_Process
        )
    )

    //------------------------------------------------Serialize_Process------------------------------!!

    passport.serializeUser(
        
        (Posted_user ,done)=>
        
            {

                var date = new Date()
                var Hours = function (){
                    if(date.getHours()<=12){return date.getHours()}
                    if(date.getHours()>12){return date.getHours()-12}}
                var Sunset = function (){
                    if(date.getHours()<12){return '오전'}
                    if(date.getHours()>=12){return '오후'}}
              
                    var month_Edited_Data = `${date.getMonth()+1}`
                    var year_Edited_Data = `${date.getFullYear()}`
                    var date_Edited_Data = `${date.getDate()}`
                    var hour_Edited_Data = `${Hours()}`
                    var sunset_Edited_Data = `${Sunset()}`
                    var minute_Edited_Data = `${date.getMinutes()}`
              
              pool.query(`INSERT INTO user_personalize.user_stay VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,[
              `${Posted_user.serial_num}`, `${Posted_user.name}`, `login`,
               `${year_Edited_Data}`,`${month_Edited_Data}`, `${date_Edited_Data}`, `${sunset_Edited_Data}`, `${hour_Edited_Data}`, `${minute_Edited_Data}`
              , '/local_login'])
            done(
                null, Posted_user)}
        
        )

    //----------------------------------------------*_Deserialize_Process----------------------------!!

    passport.deserializeUser(
        
        (Session_user,done)=>{  

        //--------1_Defining Desarialized_USer from db ----------------------------------//
        pool.query(`Select * from user_section.user_data where serial_num = ${Session_user.serial_num}`,(err,res)=>{
                   var Match_Point = res.rows[0];

        //--------2_Checking Equalization Between of ( " & Posted_user ) ---------------//
        //--------ㄴ>{For Security} ----------------------------------------------------//    
            if(Match_Point.serial_num === Session_user.serial_num){
        
        //--------3_Log down Convinced_User --------------------------------------------//    
            // console.log(`deserialize convinced_user : ${Session_user.serial_num}_${Session_user.name}`)
            done(
                null,Session_user)}
        })}
        
        )
}

module.exports = Initializing_Process;