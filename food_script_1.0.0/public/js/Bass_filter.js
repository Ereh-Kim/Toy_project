
var select = document.getElementsByClassName('range');
var Range = document.getElementsByClassName('listtype_2')
var Shot = document.getElementById('su');
var Search = document.getElementById('shot');
var Map = document.getElementById('map')
var apply = document.getElementById('btn2')
var Address = document.getElementById('formatted_address');
var Target = document.getElementById('target');
var SearchStatus = document.getElementById('searchstatus')
var Searched = document.getElementById('searched')
var Notice = document.getElementById('notice')
var Notice2 = document.getElementById('notice2')

function rangevalue() {
  document.getElementById('rangeValLabel').innerText = Range[0].value;
  document.getElementById('default').innerText = 'm'
}
// ----- 범위 지정 이벤트 ---- //

for(let clickwide of document.getElementsByClassName('select')){
  clickwide.addEventListener('click',()=>{
    clickwide.children[2].checked='true'
  })
}
// ----- 클릭 범위 확대 이벤트 ----- //

document.getElementsByClassName('select')[0].addEventListener('click',()=>{
  function showVersion_nearby(){
    $('#filter1').attr('id','filter1_activate')
    Shot.addEventListener('submit',code);
    $('.nearby_search_result').show()
    $('.arrow_activate').show()
  }
  showVersion_nearby()
})
document.getElementsByClassName('select')[1].addEventListener('click',()=>{
  function showVersion_quest(){
    $('#filter1_activate').attr('id','filter1')
    Shot.removeEventListener('submit',code)
    $('.nearby_search_result').hide()
    $('.arrow_activate').hide()
  
    alert(`this service is gonna be updated soon`)
  }
  showVersion_quest()
})
// ------ jquery _ 클릭시 간소화 이벤트 ----- //

apply.addEventListener('click', ()=>{

  var Nump = select[0].options.selectedIndex

  var value = select[0].options[Nump].value;

  alert(`검색된 위치를 기준으로 ${Range[0].value}m범위 안의 ${value}를 조회합니다`)

})
 // ---- 범위 선언 이벤트 ---------- //


Shot.addEventListener('submit',code);

function code(e) {
 // -------- Zero_Request: Next_request_setup -------- //

  e.preventDefault()
  // -- submit default prevent -- //

  $('.arrow').attr('class','arrow_activate')
  // -- 화살표 표시 -- //

  var Nump = select[0].options.selectedIndex
  var value = select[0].options[Nump].value;
  if(value === 'none'){
    value = 'restaurant'}
  // -- 범위 선언 이벤트 -- //

  var Input = Search.value
    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address: Input,
      region: "kr",
      key: process.env.G_API_KEY}
  // -- axios data fetech -- //

  }).then(

    // ------- Zero_Request: 조회한 값에 기반 위치표시 ------ //

    function (response) {

    var option = response.data.results[0].geometry.location
    var address = response.data.results[0].formatted_address
    var place_id = response.data.results[0].place_id
    // -- 필요 변수 선언 -- //

    Address.style.textAlign = 'center'
    Address.innerHTML = `<a> 내가 검색한 위치 - '${address}' </a>`;
    Address.style.backgroundColor = `#F3DAB4`;
    if(document.documentElement.clientWidth<430){
      Address.innerHTML = `<a> 내가 검색한 위치 <br> '${address}' </a>`;}
    Target.innerText = `'${Input}'에 인접한 ${value} 에 관한 검색결과`;
    // -- 검색 위치 데이터 표시 (string) -- //

    var map = new google.maps.Map(Map,{
      zoom:15,
      center: option})
    // -- (map) 선언 및 포인팅 -- //

    // ------- first_Request: 싱크확인 ------------------------ //

    if(response.data.results[0].types.includes('food')){

      let Request_place = {
        query: Input,
        fields: ['name','formatted_address','place_id']}
      let Map_place = new google.maps.places.PlacesService(map)
      // --- map request 및 필요변수 선언 -- //

      // 결과 반영 //
      Map_place.findPlaceFromQuery(Request_place, function(results,status){
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if( results[0].place_id === place_id )
          {
            Notice.innerHTML = `<div id="notice">내가 검색한 위치</div>`
            Notice2.innerHTML = `<div id="notice2">검색한 위치를 기준으로, 반경 ${Range[0].value}m 이내에 검색된 ${value}</div>`
            SearchStatus.innerHTML = `<a class='color'>'${results[0].name}'에 관한 데이터가 조회되었습니다!</a>`
            Searched.innerHTML = `<div class='searchedContext'> <div class='center3'>
             <a target='/location?place_id=${results[0].place_id}&place_name=${results[0].name}'
              href='/location?place_id=${results[0].place_id}&place_name=${results[0].name}' class='font'>
               *. '${results[0].name}'  /${results[0].formatted_address}              
               
               <form 
               action='/adding_here/${results[0].name}/?place_id=${results[0].place_id}&place_detail=${results[0].formatted_address}'
               target='/adding_here/${results[0].name}/?place_id=${results[0].place_id}&place_detail=${results[0].formatted_address}'
               method='post'>
               
               <input value="관심목록에 추가하기" class="btn_plus" type="submit">
              
               </form></a>
               </div> </div>`
}
          else{
            Notice.innerHTML = ''
            Notice2.innerHTML = `<div id="notice2">검색한 위치를 기준으로, 반경 ${Range[0].value}m 이내에 검색된 ${value}</div>`
            SearchStatus.innerHTML = `<a class='color'>${value}을 조회하기 위해선 더 정확한 검색어가 필요합니다</a>`
            Searched.innerHTML= '';
          }
        }
      })

    }
    else{
          Notice.innerHTML = ''
          Notice2.innerHTML = `<div id="notice2">검색한 위치를 기준으로, 반경 ${Range[0].value}m 이내에 검색된 ${value}</div>`
          SearchStatus.innerHTML = `<a class='color'>조회하신 지역이 반영되었습니다</a>`
          Searched.innerHTML= '';
}
  // ----------- findplace_query_function 싱크 확인 끝 -------------- //

   // --------- first_Request=> 지도 표시 --------------------------- //

  // 지도에 표시 //
    const icon = {
    path: "M22 2.282v9.65s-1.287 1.189-3.144 1.189c-2.873 0-3.326-2.41-6.549-2.41-1.078 0-2.453.601-3.307 1.289v-10.16c.866-.447 2.049-.84 3.296-.84 3.413 0 3.479 2.533 6.419 2.533 1.867 0 3.285-1.251 3.285-1.251zm-16 18.718c-2.21 0-4 .671-4 1.5s1.79 1.5 4 1.5 4-.671 4-1.5-1.79-1.5-4-1.5zm-1-21v14.75c0 1.479.354 2.936 1.031 4.25.638-1.316.969-2.76.969-4.222v-14.778h-2z",
    fillColor: "green",
    fillOpacity: 1,
    scale: 1,
rotation: 0,
 anchor: new google.maps.Point(15, 30)
    };
    // 아이콘 설정//

    var marker =  new google.maps.Marker({
      icon: icon,
      title: '내가 검색한 위치',
      map: map,
      position: option
    })
    // 마커 설정 + 아이콘 설정 함께 //

    var F_infowindow = new google.maps.InfoWindow({
       content: `<a class='mylocation'>내가 검색한 위치</a>`
     });
     // 정보창 설정 //

     F_infowindow.open({
       anchor: marker,
       map
     })
     //정보창 열람 //

    var plus = document.getElementById('plus')
    var align =document.createElement('div');
    align.id = 'align'


    plus.style.backgroundColor = `#F8B856  `
    plus.style.borderRadius = `30px`
    plus.style.marginTop = `40px`

    // --------- first_Request=> 지도 표시 끝 ----------------------------- //

    // ---------- secound_Request: Apply(range) 기반의 nearby_search -------//
    
    var service = new google.maps.places.PlacesService(map);
        var request = {
      location: option,
      radius: Range[0].value,
      type: value
    };
    // nearby _필요 변수 선언 //

    // nearby API 호출 //
    service.nearbySearch(request, nearcallback);

    // nearby 결과 UI에 반영 및 나열 //
    function nearcallback(response, status) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {

      for (var i = 0; i < response.length; i++) {
      var Total = `${response[i].name} / ${response[i].plus_code.compound_code.substr(12,23)} ${response[i].vicinity}`
      var Title = `${response[i].name}`
      var Title2 = `${response[i].plus_code.compound_code.substr(12,23)} ${response[i].vicinity}`
      var Title3 = `${response[i].place_id}`

      var boxer = document.createElement('a')
      boxer.className = 'newer';
      boxer.style.margin = '35px 50px';
      boxer.href = `/location?place_id=${Title3}&place_name=${Title}`;
      boxer.target = `/location?place_id=${Title3}&place_name=${Title}`;

      var plusform = document.createElement('form')
      plusform.target = `/adding_here/${Title}/?place_id=${Title3}&place_detail=${Title2}`
      plusform.action = `/adding_here/${Title}/?place_id=${Title3}&place_detail=${Title2}`
      plusform.method = `post`

      var pluser = document.createElement('input')
      pluser.className = 'btn_plus'
      pluser.type = 'submit'
      pluser.value = '관심목록에 추가하기'

      plusform.append(pluser)

      var context = document.createTextNode( `${i+1}. ${Total}` )



      boxer.append(context)
      boxer.append(plusform)
      align.append(boxer)

      }


      plus.innerHTML = align.innerHTML
    }

    // 지도에 표시 _neaerby //
    var n = 0;

      for (const place of response) {
        if (place.geometry && place.geometry.location) {

          const image = {
                  path:"M22 2.282v9.65s-1.287 1.189-3.144 1.189c-2.873 0-3.326-2.41-6.549-2.41-1.078 0-2.453.601-3.307 1.289v-10.16c.866-.447 2.049-.84 3.296-.84 3.413 0 3.479 2.533 6.419 2.533 1.867 0 3.285-1.251 3.285-1.251zm-16 18.718c-2.21 0-4 .671-4 1.5s1.79 1.5 4 1.5 4-.671 4-1.5-1.79-1.5-4-1.5zm-1-21v14.75c0 1.479.354 2.936 1.031 4.25.638-1.316.969-2.76.969-4.222v-14.778h-2z",
                  // path: "M0 381v380h692V1H0v380zM749 345.5V675h317V16H749v329.5z",
                  fillColor: 'orange',
                  fillOpacity: 1,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scale: 1
                };
                //아이콘 설정 //
                n++;

           marker = new google.maps.Marker({

            icon: image,
            map,
            title: `${n}. ${place.name}`,
            position: place.geometry.location,
          });
          // 마커 설정 + 아이콘 함께 //

          var S_Infowindow = new google.maps.InfoWindow({
             content: `<a class='pop'>${n}. ${place.name}</a>`
           });
          };
          //정보창 설정 //

          if(document.documentElement.clientWidth<430){
            S_Infowindow.open({
              anchor: marker,
              map
            })
          }
          // 정보창 열람 //

        }

    }



  }).then(function () {
    
    // 지도 커스터 마이징 상황에 따라 //

    Map.style.borderTopLeftRadius = '15px'
    Map.style.borderTopRightRadius = '15px'
    Map.style.width = '830px'
    Map.style.height= '350px'
    var Newer = document.getElementsByClassName('newer');

    if(document.documentElement.clientWidth<430){
      Map.style.width = '250px'
      Map.style.height= '500px'
    }


  })

  .catch(function (error){
    console.log('erro')
  })
}
