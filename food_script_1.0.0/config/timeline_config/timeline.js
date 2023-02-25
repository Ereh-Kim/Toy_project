
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
    var Total_Edited_Data = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} - ${Sunset()} ${Hours()}:${date.getMinutes()}`


module.exports = 
{ month_Edited_Data,
 year_Edited_Data,
 date_Edited_Data,
 hour_Edited_Data,
 sunset_Edited_Data,
minute_Edited_Data,
Total_Edited_Data}