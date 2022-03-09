inserting();

function inserting() {

//------------------------------------ seting document + query -------------------->

  var Place_id = decodeURI(location.search).substr(10,27);
  var Place_name = decodeURI(location.search).slice(49)

console.log(Place_name)

  var Title = document.getElementsByClassName('title')
  Title[0].innerText = `${Place_name}_ photos`

//----------------------------------------------------------------------Map api upload----------------------------------------->
  var option = new google.maps.LatLng(-33.867, 151.195)
  var Map = document.getElementById('map');
  var map = new google.maps.Map(Map,{zoom:15,center:option})
  var service = new google.maps.places.PlacesService(map);

  var Total = document.getElementById('totalphoto')
//---------------------------------------------------------------------photo upload-------------------------------------------->
  var request = {
    placeId: Place_id,
    fields: ['photos']}

  function  callback(response,status){
    if(status == google.maps.places.PlacesServiceStatus.OK){
      console.log('photo uploaded')}

//------------------------------------ callback output ------------------------------>

      var Magnify = document.getElementById('magnify')
      Magnify.src = `${response.photos[0].getUrl()}`

      var a=0;

      var Direct = document.getElementsByClassName('direction')
      Direct[0].addEventListener('click',()=>{

        if(a < 1){ a = response.photos.length}
        a--;
        console.log(a)
        Magnify.src = `${response.photos[a].getUrl()}`
      })

      Direct[1].addEventListener('click',()=>{
        if(a > response.photos.length-2){ a = -1}
        console.log(a)
        a++;
        Magnify.src = `${response.photos[a].getUrl()}`
      })


      for( i=0; i<response.photos.length; i++){
        var photoadd = document.createElement('img')
        var photobox = document.createElement(`span`)
        photoadd.className = 'photo'
        photobox.className = 'photobox'

        photoadd.src =` ${response.photos[i].getUrl()}`
        photobox.append(photoadd)
        Total.append(photobox);

        var Photo = document.getElementsByClassName('photo')

      }


     }
//------------------------------------------------------------------------------------>


  service.getDetails(request,callback);

}
