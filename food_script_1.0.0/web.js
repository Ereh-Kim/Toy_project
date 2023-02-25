var express = require('express');
var session = require('express-session')
var flash = require('express-flash');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')

var passport = require('passport');

var app = express();
var port = 4000;

var { 
  pool, 
  Loging_stay, 
  Loging_detail_history,
  Personalize_likelist_CRUD
}
 = require('./config/db_config/db_config.js')
var cors = require('cors')

pool.connect();

var likelist_names = []
var likelist_links = []
var likelist_address = []
var likelist_request_time =[]

function user_add( name, link, detail ){
  this.name = name;
  this.link = link;
  this.detail = detail;
}

app.use(cookieParser('dog'))

app.set('view engine','ejs')
app.set('trust proxy', 1)
app.use(cors())

app.use(express.static('public'));
app.use(express.static('view_direct_page'));
app.use(session({
  secret:"cat",
  name:'local_login',
  resave:false,
  saveUninitialized:false,
  rolling: true,
  cookie: {maxAge: 1000 * 60 * 60 * 6
    // secure: true
  }
  }))

app.use(flash());

app.use(passport.session())
app.use(passport.initialize())
app.use(bodyParser.urlencoded({ 
  limit: '1gb',
  parameterLimit: 1000000,
  extended: false}));
app.use(bodyParser.text({ 
  limit: '1gb'}));

async function declareTimeline(){
  
  var date = new Date()
  var Hours = function (){
      if(date.getHours()<=12){return date.getHours()}
      if(date.getHours()>12){return date.getHours()-12}}
  var Sunset = function (){
      if(date.getHours()<12){return '오전'}
      if(date.getHours()>=12){return '오후'}}

  var month_Edited_Data = date.getMonth()+1
  var year_Edited_Data = date.getFullYear()
  var date_Edited_Data = date.getDate()
  var hour_Edited_Data = Hours()
  var sunset_Edited_Data = `${Sunset()}`
  var minute_Edited_Data = date.getMinutes()
  var total = {
    month_Edited_Data: month_Edited_Data,
    year_Edited_Data: year_Edited_Data,
    date_Edited_Data: date_Edited_Data,
    hour_Edited_Data: hour_Edited_Data,
    sunset_Edited_Data: sunset_Edited_Data,
    minute_Edited_Data: minute_Edited_Data
  }
  return total
}
app.use(express.static('react_study'))
app.get('/react',(req,res)=>{
  res.sendFile(__dirname+'/react_study/react_app.html')
})

app.get('/', function(req, res) {

  if( req.user ){

    // declareTimeline().then(
    //   (result)=>{
    //   Loging_stay(req,result)
    // })

    // console.log(req.session.passport.user.id)
    // console.log(req.session.id)

      // req.session.passport.user.id = 'set on set_save_reload';

      // req.session.save( function (err) {
        // console.log(req)
        res.render('local_login_success')
        // console.log(req.session.passport.user.id)
        // });
  }
  else{
  //  console.log(req)
    res.sendFile(__dirname + '/view_direct_page/Bass/Bass_homepage.html')
  
  }
}
);

app.get('/login',function(req, res){

  res.sendFile(__dirname + '/view_direct_page/Bass/Bass_login-page.html')
});

app.get('/filter',function(req, res){

  if(typeof req.user != 'undefined'){
declareTimeline().then((result)=>{

    Loging_stay(req,result)

    pool.query('SELECT * FROM user_personalize.user_likelist where serial_num = $1',[req.user.serial_num],(req3,res3)=>{
      if(likelist_names.length === 0){
    
        for(var i=0; i<res3.rows.length; i++){
        likelist_links.push(`${res3.rows[i].like_spot_links}`)
        likelist_names.push(`${res3.rows[i].like_spot_names}`)
        likelist_address.push(`${res3.rows[i].like_spot_address}`)
        likelist_request_time.push(`${res3.rows[i].like_spot_timeline_year}/${res3.rows[i].like_spot_timeline_month}/${res3.rows[i].like_spot_timeline_date} - ${res3.rows[i].like_spot_timeline_sunset} ${res3.rows[i].like_spot_timeline_hour}: ${res3.rows[i].like_spot_timeline_minute}`)}
      }})
}).then((next)=>{

res.render('Bass_filter',{
  user_name: req.user.name,
  user_profile: req.user.profile_image_src
})

})

}
else{
res.render('Bass_filter')}


})

app.get('/account',function (req, res) {

  if(typeof req.user != 'undefined'){

declareTimeline().then((result)=>{
  Loging_stay(req,result)  
})

        pool.query(`SELECT * FROM user_personalize.user_likelist WHERE serial_num = $1`,[
          req.user.serial_num],(reqq,ress)=>{
            var likelist_account = ress.rows
         

  // res.sendFile(__dirname + '/view_direct_page/personal/personal_account.html')
  res.render('personal_account', {
    user: `${req.user.name}`,
    position: `${req.user.type}`.replace(`{"`,'').replace(`"}`,'').replace(/","/gi,' , '),
    area: `${req.user.area}`.replace(`{`,''),
    profile_image_src: `${req.user.profile_image_src}`,
    gender: `${req.user.gender}`,
    age: `${req.user.age}`,
    likelist: likelist_account
  })

})
}
else{res.send(`<script> alert('회원가입이 필요한 페이지입니다'); location.href='/' </script>`)}
})

app.get('/reviews',function (req, res) {

  if(req.user){

    declareTimeline().then((result)=>{
      Loging_stay(req,result)
    })

    pool.query(`SELECT title,place_name,place_address,insert_year,insert_month,insert_date,initial_num,image_length FROM user_section.user_review WHERE serial_num = $1`,[req.user.serial_num],(err,result)=>{

    if(typeof result != 'undefined'){
    res.render('personal_review',
    {reviewfile: result.rows})}

    else{
      res.render('personal_review')
    }

  })
    
  }
  else{res.send(`<script> alert('회원가입이 필요한 페이지입니다'); location.href='/' </script>`)}

})

app.get('/reviewObo/:initial_num/:selectedOrder',(req,res)=>{
  if(req.params.selectedOrder === '-1'){
    res.send('no data')
  }
  pool.query(`SELECT * FROM user_section.user_review WHERE initial_num = $1`,[req.params.initial_num],(err,result)=>{
    if(typeof result != 'undefined'){
      pool.query(`SELECT initial_num FROM user_section.user_review WHERE serial_num = $1`,[req.user.serial_num],(err2,result2)=>{

        var next = Number(req.params.selectedOrder)+1
        var pre = Number(req.params.selectedOrder)-1
        var selectedLength = Number(result2.rows.length)

        if(typeof result2.rows[next] === 'undefined'){
          next = -1
        }

        if(typeof result2.rows[pre] === 'undefined'){
          pre = -1
        }

        res.render('reviewObo',{
          User: req.user,
          initial_num: req.params.initial_num,
          selectedLength: selectedLength,
          selectedOrder: req.params.selectedOrder,
          matchedReview: result.rows[0],
          nextReview_initialNum: result2.rows[next],
          preReview_initialNum: result2.rows[pre]
        })

      })
    }

  })
})

app.get('/journals',function (req, res) {

  if(req.user){

    declareTimeline.then((result)=>{
      Loging_stay(req,result)
    })
    res.sendFile(__dirname + '/view_direct_page/personal/personal_journals.html')
  }

  else{res.send(`<script> alert('회원가입이 필요한 페이지입니다'); location.href='/' </script>`)}

})

app.get('/alarms',function (req, res) {
  res.sendFile(__dirname + '/static/alarms.html')
})

app.get('/location',function (req, res) {

  if(req.user){

    declareTimeline().then((result)=>{
      Loging_stay(req,result)
    })

  }

  var Summit = 0;

  pool.query(`SELECT COUNT(title) FROM user_section.user_review WHERE place_id = $1 AND place_name = $2`,[req.query.place_id, req.query.place_name], (error,situation)=>{
  
  
    if(situation.rows[0].count>5){
      pool.query(`SELECT "starRate" FROM user_section.user_review WHERE place_id = $1 AND place_name = $2`,[req.query.place_id, req.query.place_name], (err,aver)=>{
      aver.rows.forEach( element => {
      Summit += Number(element.starRate)
    })
    var Average = Math.round(Summit/aver.rows.length) 

      pool.query(`SELECT * FROM user_section.user_review WHERE place_id = $1 AND place_name = $2 LIMIT 5`,[req.query.place_id, req.query.place_name], (err,result)=>{

      res.render('template_reviews',{
        DB_reviews_starRate: Average, 
        DB_reviews: result.rows,
        DB_reviews_length: situation.rows[0].count,
        DB_reviews_overLimit: `/limit_reviews/5/5/${situation.rows[0].count}?place_id=${req.query.place_id}&place_name=${req.query.place_name}&starRate=${Average}`,
        DB_image: `/lookImage_CloseUp`});
    })
  })

  }
  else{

    pool.query(`SELECT * FROM user_section.user_review WHERE place_id = $1 AND place_name = $2`,[req.query.place_id, req.query.place_name], (err,result)=>{

      var Summit = 0;
      result.rows.forEach( element => {
         Summit += Number(element.starRate)
      })
      var Average = Summit/result.rows.length

      res.render('template_reviews',{ 
        DB_reviews_starRate: Average, 
        DB_reviews: result.rows,
        DB_reviews_length: result.rows.length,
        DB_image: `/lookImage_CloseUp`  });
    })

  }
})
  
})

app.get(`/lookImage_CloseUp/:initial_num/:pages`,(req,res)=>{
  pool.query(`SELECT review_image_posted FROM user_section.user_review WHERE initial_num = $1`,[req.params.initial_num],(err,result)=>{
    var Image_storage = result.rows[0].review_image_posted.replace(/,data/gi,' data').split(' ')
    var selected_num = new Number(req.params.pages)
    
    if(typeof Image_storage[selected_num] != 'undefined'){
      res.render('lookImage_CloseUp',{
      written: {title: req.query.title, writer: req.query.writer},
      source: Image_storage,
      select: req.params.pages,
      pre: `/lookImage_CloseUp/${req.params.initial_num}/${selected_num-1}`,
      next: `/lookImage_CloseUp/${req.params.initial_num}/${selected_num+1}`,
      initialize: req.params.initial_num})}
  
      else{
        if(req.params.pages === '-1'){
          res.render('lookMoreReviews',{
            error: 'No More Image',
            return_page: `/lookImage_CloseUp/${req.params.initial_num}/${selected_num+1}`
          })          
        }
        else{
          res.render('lookMoreReviews',{
            error: 'No More Image',
            return_page: `/lookImage_CloseUp/${req.params.initial_num}/${selected_num-1}`
          })  
        }}
  
    })
})

app.get('/photo',function (req, res) {

  if(req.user){

    declareTimeline().then((result)=>{
      Loging_stay(req,result)
    })

  }

  res.sendFile(__dirname + '/view_direct_page/template/template_photo.html');
})

app.get('/account/edit',(req,res)=>{

 declareTimeline().then((result)=>{
  Loging_stay(req,result)
 })

  pool.query('SELECT * FROM user_section.user_data where serial_num = $1', [ req.user.serial_num ], (request,response)=>{
    var user_data = response.rows[0]
  res.render('account_edit',{
    user_image: user_data.profile_image_src,
    user_name: user_data.name,
    user_id: user_data.id,
    user_password: user_data.password
  })
})

})

app.post('/account/update', (req,res)=>{

  declareTimeline().then((result)=>{
    Loging_stay(req,result)
    Loging_detail_history(req,result,'UPDATE','ACCOUNT_DATA_EDIT',null,null)
  })

var { id, name, password, type, area, gender, age, profile_image_src } = req.body

pool.query(`UPDATE user_section.user_data set id = $1, name = $2, password = $3, type = array[$4], area = array[$5], gender = $6, age = $7, profile_image_src = $8 WHERE serial_num = $9`,
[ id, name, password, type, area, gender, age, profile_image_src, req.user.serial_num ])

res.send(`<script> alert('${req.user.name}님의 회원정보 수정이 성공적으로 완료되었습니다. (수정이후, 자동으로 로그아웃됩니다)'); location.href = '/logout'; </script>`)

})

app.get(`/modification_review/:initial_num/:selectedOrder/:selectedLength`,(req,res)=>{

  pool.query(`SELECT * FROM user_section.user_review WHERE serial_num = $1 AND initial_num = $2`, [ req.user.serial_num, req.params.initial_num ],(err,result)=>{

    res.render(`modification_review`,{
      initial_num: req.params.initial_num,
      selectedLength: req.params.selectedLength,
      selectedOrder: req.params.selectedOrder,
      matchedReview: result.rows[0],
      User: req.user.name
    })

  })

})

app.post(`/modify_review/:initial_num`,(req,res)=>{
 var {title, keyword, starRate, review_content} = req.body
pool.query(`UPDATE user_section.user_review set title = $1, keyword = $2, "starRate" = $3, reviews = $4 WHERE initial_num = $5 AND serial_num = $6`,[ title, keyword, starRate, review_content, req.params.initial_num, req.user.serial_num ])
res.send(`<script> alert('성공적으로 리뷰가 수정되었습니다'); window.close(); </script>`)
})

app.post('/adding_here/:section', function (req,res) {
if(req.user){
  declareTimeline().then((result)=>{
    Loging_stay(req,result)

  if(likelist_names.includes(`${req.params.section}`)){
    res.render(`personalize_add`,{
      alert: `${req.params.section}`,
      like: likelist_names,
      link: likelist_links,
      detail: likelist_address,
      trace: likelist_request_time})
  }
  else{
  
  var Total_Edited_Data =  `${result.year_Edited_Data}/${result.month_Edited_Data}/${result.date_Edited_Data} ${result.sunset_Edited_Data} ${result.hour_Edited_Data}:${result.minute_Edited_Data}분`


  likelist_links.push(`${req.query.place_id}`)
  likelist_names.push(`${decodeURI(req.params.section)}`)
  likelist_address.push(`${req.query.place_detail}`)
  likelist_request_time.push(`${Total_Edited_Data}`)

  var new_user_add = new user_add(`${req.params.section}`,`${req.query.place_id}` ,`${req.query.place_detail}`)


pool.query(
  `SELECT * FROM user_personalize.user_likelist where serial_num = $1 and like_spot_names = $2`,
  [req.user.serial_num, `${req.params.section}`],(request,result2)=>{

    if(result2.rows.length >= 1){ return }

    else{
      
      Personalize_likelist_CRUD(req,result)
      Loging_detail_history(req,result,'INSERT','LIKE_LIST_EDIT',new_user_add,`${req.params.section} 추가`)

    }}

)

  res.send(`<script> alert('${req.params.section}이 성공적으로 관심목록에 추가되었습니다'); window.close() </script>`)
  }
})

}
else{res.send(`<script> alert('회원가입이 필요한 활동입니다'); window.close(); </script>`)}

})

app.post('/excluding_here/:section', function (req,res) {

  var listup = likelist_names
  if(likelist_names.includes(`${req.params.section}`)){

    var Delete_selected = listup.indexOf(`${req.params.section}`)
    
    if(likelist_names.length <= 2 ){ var Delete_from_orChoose1 = Delete_selected+1 }
    else{ var Delete_from_orChoose1 = 1 }

    likelist_names.splice( Delete_selected, Delete_from_orChoose1 );
    likelist_address.splice( Delete_selected, Delete_from_orChoose1 );
    likelist_links.splice( Delete_selected, Delete_from_orChoose1 );
    likelist_request_time.splice( Delete_selected, Delete_from_orChoose1 );

    pool.query(`
    DELETE FROM user_personalize.user_likelist
    WHERE
    serial_num = $1 AND
    like_spot_names = $2
    RETURNING *`,[req.user.serial_num, `${req.params.section}`])

    declareTimeline().then((result)=>{

      var new_user_add = new user_add(`${req.params.section}`,`${req.query.place_id}` ,`${req.query.place_detail}`)

      Loging_stay(req,result)
      Loging_detail_history(req,result,'DELETE', 'LIKE_LIST_EDIT', new_user_add,`${req.params.section} 삭제`)
  
})}

 res.render(`personalize_add`,{
  alert_deleting: `${decodeURI(req.params.section)}`,
  like: likelist_names,
  link: likelist_links,
  detail: likelist_address,
  trace: likelist_request_time })
})

app.get('/excluding_here_from_account/:place_name',(req,res)=>{

  declareTimeline().then((result)=>{
    Loging_stay(req,result)

    var new_user_add = new user_add(`${req.params.place_name}`,`${req.query.place_id}` ,`${req.query.place_address}`)
    Loging_detail_history(req,result,'DELETE', 'LIKE_LIST_EDIT', new_user_add,`${req.params.section} 삭제`)
  
    res.send(`<script> alert('성공적으로 관심목록에서 제외되었습니다'); location.href='/account'; </script>`)
    pool.query('DELETE FROM user_personalize.user_likelist where like_spot_names = $1 and like_spot_links = $2',[ req.params.place_name, req.query.place_id ])
  

  })


})

app.get('/posting_review/:place_name',(req,res)=>{

  if(typeof req.user != 'undefined'){
  declareTimeline().then((result)=>{
    Loging_stay(req,result)
  })

  res.render('posting_review',{
    user: req.user.name,
    select: req.params.place_name,
    form: `/post_review/${req.params.place_name}?place_id=${req.query.place_id}&place_address=${req.query.place_address}`})}

  else{
    res.render('posting_review_Guser',{
      user: null,
      select: req.params.place_name,
      form: `/post_review/${req.params.place_name}?place_id=${req.query.place_id}&place_address=${req.query.place_address}`})
  }
})

app.get('/excluding_review/:initial_num',(req,res)=>{
  pool.query(`DELETE FROM user_section.user_review WHERE serial_num = $1 AND initial_num = $2`,
  [req.user.serial_num, req.params.initial_num],(err,result)=>{
    if( typeof result != 'undefined'){
      res.send(`<script> alert('성공적으로 리뷰가 삭제되었습니다'); location.href='/reviews'; </script>`)}
    else{
      res.send(`<script> alert('리뷰가 이미 삭제되었거나 잘못된 접근입니다'); location.href='/reviews'; </script>`)
    }
  })

})

app.post(`/post_review/:place_name`,(req,res)=>{

  if(typeof req.user != 'undefined'){
  declareTimeline().then((result)=>{

    Loging_stay(req,result)

    var {title, keyword, review_content, review_image_posted, starRate, image_length} = req.body
    
    pool.query(`INSERT INTO user_section.user_review values ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16 ,$17, $18, $19, $20, $21, $22 , default )`,
    [ req.user.serial_num, title, keyword, review_content, req.query.place_id, req.params.place_name, req.query.place_address,
      result.year_Edited_Data, result.month_Edited_Data, result.date_Edited_Data, `${result.sunset_Edited_Data}`, result.hour_Edited_Data, result.minute_Edited_Data,
      req.user.area, req.user.age, req.user.gender, review_image_posted, null, null, req.user.name, starRate, image_length
    ])

    var new_user_add = new user_add(`${req.params.place_name}`,`${req.query.place_id}` ,`${req.query.place_address}`)
    history_insert_review(req,result, new_user_add)
  
    res.send(`<script> alert('성공적으로 리뷰가 등록되었습니다'); window.close(); </script>`)

  })}

  else{
    var {title, keyword, review_content, review_image_posted, G_user, G_email} = req.body

    declareTimeline().then((result)=>{
    
    pool.query(`INSERT INTO user_section.user_review values ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16 ,$17 ,$18 ,$19 ,$20 )`,
    [ null, title, keyword, review_content, req.query.place_id, req.params.place_name, req.query.place_address,
      result.year_Edited_Data, result.month_Edited_Data, result.date_Edited_Data, `${result.sunset_Edited_Data}`, result.hour_Edited_Data, result.minute_Edited_Data,
      null, null, null, review_image_posted, G_user, G_email, null
    ])
    res.send(`<script> alert('성공적으로 리뷰가 등록되었습니다'); window.close(); </script>`)
  })
  }
  
})

app.get('/limit_reviews/:Lastpage/:Limit/:Total',(req,res)=>{
  pool.query(`SELECT * FROM user_section.user_review WHERE place_id= $1 AND place_name= $2 OFFSET $3 LIMIT $4`, [req.query.place_id, req.query.place_name, req.params.Lastpage, req.params.Limit],(err,result)=>{
    
    if(typeof result === 'undefined'){
      var Lastpage_edited = new Number(req.params.Lastpage)+5;
       res.render('lookMoreReviews',{
         error: `More Reviews doesn't exist`,
         return_page: `/limit_reviews/${Lastpage_edited}/${req.params.Limit}/${req.params.Total}?place_id=${req.query.place_id}&place_name=${req.query.place_name}`

       })      
    }

    else{
    if(result.rows.length != 0){
    var Lastpage_edited = new Number(req.params.Lastpage) + 5;
    var Return_page = new Number(req.params.Lastpage) - 5;
    res.render('lookMoreReviews',{
      total: req.params.Total,
      DB_reviews_starRate: req.query.starRate,
      DB_reviews_overLimited: result.rows,
      DB_reviews_overLookLink: `/limit_reviews/${Lastpage_edited}/${req.params.Limit}/${req.params.Total}?place_id=${req.query.place_id}&place_name=${req.query.place_name}&starRate=${req.query.starRate}`,
      DB_reviews_Lastpage: req.params.Lastpage,
      return_page: `/limit_reviews/${Return_page}/${req.params.Limit}/${req.params.Total}?place_id=${req.query.place_id}&place_name=${req.query.place_name}&starRate=${req.query.starRate}`
    })}
     else{
      var Lastpage_edited = new Number(req.params.Lastpage) - 5;
       res.render('lookMoreReviews',{
         error: `More Reviews doesn't exist`,
         return_page: `/limit_reviews/${Lastpage_edited}/${req.params.Limit}/${req.params.Total}?place_id=${req.query.place_id}&place_name=${req.query.place_name}`

       })
     }}
  })
})

// app.get('/overLookLink',(req,res)=>{
//   pool.query(`SELECT * FROM user_section.user_review WHERE place_id= $1 AND place_name= $2 OFFSET $3 LIMIT 10`, [req,query.place_id, req.query.place_name],(err,result)=>{

//   })
// })

app.get('/denyAccessFromStranger',(req,res)=>{
  res.send(`<script> alert('로그인(google) 및 회원가입(food-script)이 되어 있지 않은 사용자는 해당 서비스를 이용할 수 없습니다'); window.close(); </script>`)
})

// passport_Local
var Local_Strategy = require('./config/Passport_Local/Local_Strategy.js');
Local_Strategy(passport);

app.get('/login/local',function (req,res) {
  res.render('login_local')
})

app.post('/login_local',

  passport.authenticate('local',
  {successRedirect: '/',
   failureRedirect: '/login/local',
   successFlash: true,
   failureFlash: true})
   
)

app.get('/logout',function (req,res) {
if(req.user){
  console.log('session eliminated')

  declareTimeline().then((result)=>{
    Loging_stay(req,result).then(()=>{

      req.logout();
      res.redirect('/login');
    })
  })
}
})


app.get('/register', function(req,res) {
  res.render('register')
})

app.post('/register_user',function(req,res){
  


  var error = []
  var {name, id, password, type, area, gender, age, profile_image_src} = req.body;


  pool.query('Select id,name from user_section.user_data where id = $1',[id],(err,db_res)=>{
    if( typeof db_res.rows[0] != 'undefined'){

      var CheckIn_User = db_res.rows[0]

      if(CheckIn_User.name === name){
        error.push({message: 'Submitted_Name is already in use by Another_user'})
        res.render('register',{ error })}

      else{
      if(CheckIn_User.id === id){
        error.push({message: 'Submitted_ID is already in use by Another_user'})
        res.render('register',{ error })}
      }

    }

    else{
       
  if(id.length< 6){
    error.push({message: 'ID must be a least 6 characters long'})}
  else{console.log('ID - no issue :)')}


  if(password.length< 5){
    error.push({message: 'Password must be a least 15 characters long'})}
  else{console.log('PASSWORD - no issue :)')}


  if(error.length>0){
    error.forEach(e => console.log(e.message))
    res.render('register',{ error })}


  else{
    var blinder = '*'
    var discovered_PW = password.slice(0,5)
    var cover_yet_PW = password.substr(5)
    var covered_PW = cover_yet_PW.replace(`${cover_yet_PW}`,`${blinder.repeat(cover_yet_PW.length)}`)

    res.render('dashboard',

    {
    name:`${name}`,
    id:`${id}`,
    password:`${discovered_PW}${covered_PW}`,
    type:`${type}`,
    area:`${area}`,
    gender:`${gender}`,
    age: `${age}`,
    profile_image: `${profile_image_src}`
    })

      pool.query('INSERT INTO user_section.user_data VALUES (default, $1, $2, $3, array[$4], array[$5], $6, $7, $8) RETURNING *',
      [id, name, password, type, area, gender, age, profile_image_src])
    }
  

  
  
  }
  
})
})

app.get('/find_process',function (req,res) {
  res.render('finding_process')
})

// passport_Google
var Google_Strategy = require('./config/Passport_Google/Google_Strategy.js');
Google_Strategy(passport);

app.get('/login/google/',
  
  passport.authenticate('google', 
  { scope: ['profile', 'email'] }));

app.get('/logout/google/',(req,res)=>{
   res.send(`<script> location.href= 'https://accounts.google.com/logout'; alert('google logout'); location.href= '/';</script>`)
 })

app.get("https://food-script.loca.lt",
  
  passport.authenticate('google',
  { failureRedirect: '/login',
    successRedirect: '/' })
    
    );

    
app.listen(process.env.PORT || port, () => {
  console.log(`app listening on port ${port}!`)
});