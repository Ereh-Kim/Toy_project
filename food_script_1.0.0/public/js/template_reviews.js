
inserting();

function inserting(){

  var Place_id = decodeURI(location.search).substr(10,27);
  console.log(Place_id)

  var image = document.getElementsByClassName('image');
  var text = document.getElementById('text')
  var lookmoreP = document.querySelector(".lookupsection-photo");
  var Link = document.getElementsByClassName('link')


  var hoverword = 'look more'

  image[0].addEventListener('mouseenter',()=>{text.innerText = hoverword})
  text.addEventListener('mouseenter',()=>{text.innerText = hoverword})
  image[0].addEventListener('mouseout',()=>{text.innerText = ''})

var option = new google.maps.LatLng(-33.867, 151.195)

var Map = document.getElementById('map');
var map = new google.maps.Map(Map,{zoom:15,center:option})

var service = new google.maps.places.PlacesService(map);

var request = {
  placeId: Place_id,
  fields: ['rating', 'formatted_phone_number','photos', 'reviews', 'opening_hours', 'name', 'formatted_address'],
}

function  callback(response,status){
  if(status == google.maps.places.PlacesServiceStatus.OK){

console.log(response)

var Answer = document.getElementsByClassName('answer')
var Locate = document.getElementsByClassName('name')
var write_link_review = document.getElementById('write_review_link')
var write_link_journal = document.getElementById('write_journal_link')

write_link_review.href = `/posting_review/${response.name}?place_id=${Place_id}&place_address=${response.formatted_address}`
write_link_review.target = `/posting_review/${response.name}?place_id=${Place_id}&place_address=${response.formatted_address}`

write_link_journal.href = `/posting_journal/${response.name}?place_id=${Place_id}&place_address=${response.formatted_address}`
write_link_journal.target = `/posting_journal/${response.name}?place_id=${Place_id}&place_address=${response.formatted_address}`

var star_rate = '&#11088'.repeat(response.rating)
Answer[0].innerHTML = star_rate

Answer[1].innerText =`${response.formatted_address}`
Answer[2].innerText = `${response.formatted_phone_number}`

Locate[0].append(`${response.name}`)
Locate[1].innerText = `${response.name}`

if(response.photos){
var value = `url(${response.photos[0].getUrl()})`
image[0].style.backgroundImage = `url(${response.photos[0].getUrl()})`
lookmoreP.addEventListener('mouseenter',()=>{lookmoreP.backgroundImage = value})
Link[0].href = `/photo?place_id=${Place_id}&place_name=${response.name}`
Link[0].target = `/photo?place_id=${Place_id}&place_name=${response.name}`
}

if(response.photos === undefined){ hoverword = 'no image directory' }

var Hour = document.getElementsByClassName('answer_hour');

console.log(response.opening_hours)
console.log(response.opening_hours.open_now)
var openquery = response.opening_hours.open_now

if(openquery === true){

  var Working = document.getElementsByClassName('text')
  var workbox = document.createElement('p')
  var Worknow = document.createTextNode('Open Now')
  workbox.className = 'Status'

  workbox.append(Worknow)
  Working[3].append(workbox)
}
else{
  var Working = document.getElementsByClassName('text')
  var workbox = document.createElement('p')
  var Worknow = document.createTextNode('Close Now')
  workbox.className = 'Status'

  workbox.append(Worknow)
  Working[3].append(workbox)
}

//----------------------------------------------------------------------------------------------hoursection---------------------------------------------------------------------------------------->
for(var s=0; s<response.opening_hours.weekday_text.length; s++){



  var Opencontent = response.opening_hours.weekday_text;
  var opentext = document.createTextNode(Opencontent[s])
  var openbox = document.createElement('a')
  openbox.className = 'openbox';
  openbox.append(opentext)
  Hour[0].append(openbox)

}

//-------------------------------------------------------------------------------------------------reviewsection------------------------------------------------------------------------------------>
for(var i=0; i<response.reviews.length; i++){

  var Total = response.reviews.length;
  var Aname = response.reviews[i].author_name;
  var Rate = response.reviews[i].rating;
  var Text = response.reviews[i].text;
  var Time = response.reviews[i].relative_time_description

  var totalreview = document.getElementById('totalreview')
  totalreview.innerText = `작성된 종합 리뷰 ( ${Total} ) 건`

  var reviewAlign = document.createElement('li')
  var reviewline = document.getElementsByClassName('reviewalign')
  var reviewadd = document.createElement('div');

  var reviewnamer = document.createTextNode(`유저/ '${Aname}' 님`);
  var reviewrater = document.createTextNode(`별점/ `	
  +'⭐'.repeat(Rate));
  var reviewText = document.createTextNode(`리뷰/ ${Text}`);
  var reviewTime = document.createTextNode(` / (${Time})`);

  reviewadd.className = 'review';

  var ttext = document.createElement('p');
  var atext = document.createElement('p');
  var ctext = document.createElement('p');
  var dtext = document.createElement('a');
  ctext.className = 'right'



  ttext.append(reviewnamer);
  atext.append(reviewrater);
  ctext.append(reviewTime);

  reviewAlign.append(dtext);
  reviewadd.append(ttext);
  reviewadd.append(atext);
  reviewadd.append(reviewText);
  reviewadd.append(ctext);


  reviewAlign.append(reviewadd);

  reviewline[0].append(reviewAlign)
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->


  }


}

service.getDetails(request,callback);


}

