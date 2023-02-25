const dotenv = require("dotenv")
dotenv.config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: `${process.env.DATABASE_URL}` ,
  ssl: {
    rejectUnauthorized: false
  }
});
// ㄴ> heroku로 배포할때

// const pool = new Pool({
//   connectionString:`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
// });

pool.connect();

async function Loging_stay (req,sended_data){
  try{
  pool.query(`INSERT INTO user_personalize.user_stay VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,[
    `${req.user.serial_num}`, `${req.user.name}`, `staying`,
    sended_data.year_Edited_Data, sended_data.month_Edited_Data, sended_data.date_Edited_Data, `${sended_data.sunset_Edited_Data}`, sended_data.hour_Edited_Data, sended_data.minute_Edited_Data
    ,`${req.route.path}`])}
    catch(err){throw err}
}
// ---- 사용자 흔적(path)기록 --- //

async function Loging_detail_history (req,sended_data,activity,theme,object,records){
  try{
  pool.query(`INSERT INTO user_section.user_history VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 )`,
    [req.user.serial_num, activity, theme, object, `USER: ${req.user.name}`, records,
    sended_data.year_Edited_Data, sended_data.month_Edited_Data, sended_data.date_Edited_Data, `${sended_data.sunset_Edited_Data}`, sended_data.hour_Edited_Data, sended_data.minute_Edited_Data
  ])}catch(err){throw err}
}
// ----- 사용자 흔적(log)기록 --- //

async function Personalize_likelist_CRUD(req,sended_data){
  try{
  pool.query(`INSERT INTO user_personalize.user_likelist VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 ,$10)`,
    [req.user.serial_num, `${req.params.section}`,`${req.query.place_id}` ,`${req.query.place_detail}`, 
    sended_data.year_Edited_Data, sended_data.month_Edited_Data, sended_data.date_Edited_Data, `${sended_data.sunset_Edited_Data}`, sended_data.hour_Edited_Data, sended_data.minute_Edited_Data
  ])}catch(err){throw err}
}
// ---- 관심목록 표기 (personalize) --- //


// async function history_update_userData(req,sended_data){
//   try{
//   pool.query(`INSERT INTO user_section.user_history VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 )`,
//     [req.user.serial_num, 'UPDATE', 'ACCOUNT_DATA_EDIT', null, `USER: ${req.user.name}`, null,
//     sended_data.year_Edited_Data, sended_data.month_Edited_Data, sended_data.date_Edited_Data, `${sended_data.sunset_Edited_Data}`, sended_data.hour_Edited_Data, sended_data.minute_Edited_Data
//   ])}catch(err){throw err}
// }

// async function history_insert_likelist(req,sended_data, new_user_add){
//   try{
//   pool.query(`INSERT INTO user_section.user_history VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 )`,
//   [req.user.serial_num, 'INSERT', 'LIKE_LIST_EDIT', new_user_add, `USER: ${req.user.name}`, `${req.params.section} 추가`,
//   sended_data.year_Edited_Data, sended_data.month_Edited_Data, sended_data.date_Edited_Data, `${sended_data.sunset_Edited_Data}`, sended_data.hour_Edited_Data, sended_data.minute_Edited_Data
// ]) }catch(err){throw err}
// }

// async function history_delete_likelist(req,sended_data, new_user_add){
//   try{
//   pool.query(`INSERT INTO user_section.user_history VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 )`,
//   [req.user.serial_num, 'DELETE', 'LIKE_LIST_EDIT', new_user_add, `USER: ${req.user.name}`, `${req.params.section} 삭제`,
//   sended_data.year_Edited_Data, sended_data.month_Edited_Data, sended_data.date_Edited_Data, `${sended_data.sunset_Edited_Data}`, sended_data.hour_Edited_Data, sended_data.minute_Edited_Data
// ])}catch(err){throw err}
// }

// async function history_insert_review(req,sended_data, new_user_add){
//   try{
//   pool.query(`INSERT INTO user_section.user_history VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 )`,
//   [req.user.serial_num, 'INSERT', 'LOCATION_REVIEW_EDIT', new_user_add, `USER: ${req.user.name}`, `${req.params.place_name} 리뷰 생성`,
//   sended_data.year_Edited_Data, sended_data.month_Edited_Data, sended_data.date_Edited_Data, `${sended_data.sunset_Edited_Data}`, sended_data.hour_Edited_Data, sended_data.minute_Edited_Data
// ])}catch(err){throw err}
// }

async function likelist_upload(req,likelist){
  try{
  pool.query('SELECT * FROM user_personalize.user_likelist where serial_num = $1',[req.user.serial_num],(req3,res3)=>{
    if(likelist_names.length === 0){
  
      for(var i=0; i<res3.rows.length; i++){
        likelist.likelist_links.push(`${res3.rows[i].like_spot_links}`)
        likelist.likelist_names.push(`${res3.rows[i].like_spot_names}`)
        likelist.likelist_address.push(`${res3.rows[i].like_spot_address}`)
        likelist.likelist_request_time.push(`${res3.rows[i].like_spot_timeline_year}/${res3.rows[i].like_spot_timeline_month}/${res3.rows[i].like_spot_timeline_date} - ${res3.rows[i].like_spot_timeline_sunset} ${res3.rows[i].like_spot_timeline_hour}: ${res3.rows[i].like_spot_timeline_minute}`)}
    }
    else{
      return
    }
  })
}catch(err){throw err}}

module.exports = { 
  pool, 
  Loging_stay, 
  Loging_detail_history,
  Personalize_likelist_CRUD, 
  likelist_upload };