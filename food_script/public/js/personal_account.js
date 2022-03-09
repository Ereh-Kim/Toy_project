function init(){
  console.log('init');
    gapi.load('auth2',function(){
  console.log('auth2');
    window.gauth =  gapi.auth2.init({client_id: "549894532540-f9caavscf2vie2vlg4gc24njavgda0hs.apps.googleusercontent.com"});

    gauth.then(

    function(){
  console.log(`success`);
  var Name = document.getElementsByClassName('list.a');
  var Image = document.getElementsByClassName('box2');
  var Guser = gauth.currentUser.get().getBasicProfile();
    console.log(gauth.isSignedIn.get());

    if(gauth.isSignedIn.get())
  {console.log(`logined`);
    Name[0].append(`"${Guser.getName()}"`)
    Image[0].src = Guser.getImageUrl()

  }

    else
    {
      var defualt = document.getElementsByClassName('list.a')

      if(req.user != 'undefined'){
        defualt[0].append(`User-Unknown`)
        Image[0].src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjAuODIyIDE4LjA5NmMtMy40MzktLjc5NC02LjY0MS0xLjQ5LTUuMDktNC40MTggNC43MTktOC45MTIgMS4yNTEtMTMuNjc4LTMuNzMyLTEzLjY3OC01LjA4MiAwLTguNDY1IDQuOTQ5LTMuNzMyIDEzLjY3OCAxLjU5OCAyLjk0NS0xLjcyNSAzLjY0MS01LjA5IDQuNDE4LTIuOTc5LjY4OC0zLjE3OCAyLjE0My0zLjE3OCA0LjY2M2wuMDA1IDEuMjQxaDEuOTk1YzAtMy4xMzQtLjEyNS0zLjU1IDEuODM4LTQuMDAzIDIuODUxLS42NTcgNS41NDMtMS4yNzggNi41MjUtMy40NTYuMzU5LS43OTUuNTkyLTIuMTAzLS4zMzgtMy44MTUtMi4wNTgtMy43OTktMi41NzgtNy4wODktMS40MjMtOS4wMjYgMS4zNTQtMi4yNzUgNS40MjYtMi4yNjQgNi43NjctLjAzNCAxLjE1IDEuOTExLjYzOSA1LjIxOS0xLjQwMyA5LjA3Ni0uOTEgMS43MTktLjY3MSAzLjAyMy0uMzEgMy44MTQuOTkgMi4xNjcgMy43MDcgMi43OTQgNi41ODQgMy40NTggMS44NzkuNDM2IDEuNzYuODgyIDEuNzYgMy45ODZoMS45OTVsLjAwNS0xLjI0MWMwLTIuNTItLjE5OS0zLjk3NS0zLjE3OC00LjY2M3oiLz48L3N2Zz4="

      }

      console.log(`not-in`)}},
    function(){
      console.log(`failed`)}



  )});
}

//

