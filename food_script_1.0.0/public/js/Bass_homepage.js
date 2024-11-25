
var Pur = document.getElementById('purpose');
var Htu = document.getElementById('HTU');
var Sup = document.getElementById('support');
var Intro = document.getElementById('introduction');
var Sta = document.getElementById('States');

Pur.addEventListener('click',
()=>{
  Intro.innerHTML = Script[0];

  Pur.className = 'afterclick';

  Sup.className = '';
  Htu.className = '';
});


Htu.addEventListener('click',
()=>{
  Intro.innerHTML = Script[1];

Htu.className = 'afterclick';

  Sup.className = '';
  Pur.className = '';

});

Sup.addEventListener('click',
()=>{
  Intro.innerHTML = Script[2];

  Sup.className = 'afterclick';

  Pur.className = '';
  Htu.className = '';

});


let Script =
[

`<div class="detail1">
<div>Food Script stands for...</div>
<div>Foody looking for nice meal,</div>
<div>Writer eager to share experience,</div>
<div>Owner needs promotion,</div>
<br>
<div>And...</div>
<div>You be interested in this</div>
<br>
<div>we’re waiting for</div>
<div>your pracious participation !!</div>
</div>`,


`
<span id="buttonA">Client</span>

<div class="detail2">

<div class="p">
  <p class="T">*Check Cool Review</p>
  <p class="Po">
    If you looking for a awesome restuarant?
    Then you could search it by review whick
    others already wrote it!
  </p>
  <p class="Po">
    By the way, if you want to filter the results
    the way you want? Then you could use the
    filter feature to find what you want!</p>
</div>

<div class="p2">
  <p class="T">*Start Your Own Food Journal</p>

  <p class="Po">
    Is there anyone wondering to be a Journalist? Then
    let’s start with us! </p>
  <p class="Po">
    Build your profile, add your personal journal
    and start your food journal career. A good beginning is half the battle.
    Bless you young solider!</p>
</p>
</div>

</div>
<span id="buttonB">Owner</span>

<div class="detail2">

<div class="p">
  <p class="T">* Begin your Branding Business
</p>
  <p class="Po">
While SNS getting repidly growth, Branding Business are getting
value day by day. For Anyone who’re wondering about branding,
Food Script would be a good choice to start your branding business.
Build your profile, Add some visual images and upload self promotion
contents. (But be aware of that Branding is social process)
  </p>
</div>

<div class="p2">
  <p class="T">* Keep Monitoring Your Business Condition</p>

  <p class="Po">
Much more review uploads is waiting for you! It might be stressful
but! it will be mostly helpful your business by accerpting useful reviews
as a feedback. </p>
  <p class="Po">
All you need is check your feedbacks and maintain condition or try for
some changes for the best goal you want!</p>
</p>
</div>

</div>

`,

`

<p class="T">DESIGN-License</p>

<div class="T">Font-Source</div>

<p>
Copyright (c) 2017-11-30, 한국저작권위원회 (https://gongu.copyright.or.kr/gongu/wrt/wrt/view.do?wrtSn=13072022&menuNo=200133),
with Reserved Font Name KCC은영체.
</p>

<p>
Copyright (c) 2010, NAVER Corporation (https://www.navercorp.com/),<br>
with Reserved Font Name Nanum, Naver Nanum, NanumGothic, Naver NanumGothic,<br>
NanumMyeongjo, Naver NanumMyeongjo, NanumBrush, Naver NanumBrush, NanumPen,<br>
Naver NanumPen, Naver NanumGothicEco, NanumGothicEco, Naver NanumMyeongjoEco,<br>
NanumMyeongjoEco, Naver NanumGothicLight, NanumGothicLight, NanumBarunGothic,<br>
Naver NanumBarunGothic, NanumSquareRound, NanumBarunPen, MaruBuri<br>
This Font Software is licensed under the SIL Open Font License, Version 1.1.<br>
This license is copied below, and is also available with a FAQ at<br>
: http://scripts.sil.org/OFL

SIL OPEN FONT LICENSE
Version 1.1 - 26 February 2007 
</p>

<div class="T">Brand & Logo</div>
`

];

// User Status
function init(){
  console.log('init');
    gapi.load('auth2',function(){
  console.log('auth2');
    window.gauth =  gapi.auth2.init({client_id: ""});

    gauth.then(

    function(){
  console.log(`success`);
    var Status = document.getElementById('Staa');
    var Logout = document.getElementById('logouted');
    var Login = document.getElementById('logined');
    console.log(gauth.isSignedIn.get());

    if(gauth.isSignedIn.get())
  {console.log(`logined`);
    Status.innerText = '';
    Login.innerText = 'Logined /';
    Logout.innerText = ' Logout';
    Logout.href = '/logout/google/';

    async function Guser(){
      var Guser = gauth.currentUser.get().getBasicProfile() 
      return Guser}

    Guser().then((Guser)=>{
      Guser_Name = Guser.SX+Guser.gW
      document.cookie = `Guser=${Guser_Name}; secure;`

      console.log(Guser.SX+Guser.gW)
    })
    

  }

    else
    {console.log(`not-in`)}},
    function(){
      console.log(`failed`)}

  )});
}

var Input = document.getElementsByClassName('Searchbar')

function Gothough(e) {
  e.preventDefault();
  var Research = Input[0].value
  location.replace(`https://foodscript.loca.lt/filter?research=${Research}`)
}
var Redirecting = document.getElementById('redirect')
Redirecting.addEventListener('submit',Gothough)

