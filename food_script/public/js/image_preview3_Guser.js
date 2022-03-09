function init(){
    console.log('init');
      gapi.load('auth2',function(){
    console.log('auth2');
      window.gauth =  gapi.auth2.init({client_id: "549894532540-f9caavscf2vie2vlg4gc24njavgda0hs.apps.googleusercontent.com"});
  
      gauth.then(
  
      function(){
    console.log(`success`);


      console.log(gauth.isSignedIn.get());
  
      if(gauth.isSignedIn.get()){
    {
        console.log(`logined`);

  
        var Guser = gauth.currentUser.get().getBasicProfile() }
        var G_Inint = document.getElementById('otherUser')
        G_Inint.innerText = Guser.nf

        var G_user_id = document.getElementById('G_user')
        G_user_id.value = Guser.nf

        var G_user_email = document.getElementById('G_email')
        G_user_email.value = Guser.nv
        
    }
  
      else
      {
        console.log(`not-in`)
        var form = document.querySelector('form')
        form.action = '/denyAccessFromStranger'
        form.method = 'get'
        
        alert('로그인(google) 및 회원가입(food-script)이 되어 있지 않은 사용자는 해당 서비스를 이용할 수 없습니다')
    }},
      function(){
        console.log(`failed`)}
  
    )});
  }
  

var image_preview = document.getElementById('image_preview_container')
var image_src = document.getElementById('image_src')

var image_submit_btn = document.getElementById('image_preview')
var submit_data = [];
image_submit_btn.addEventListener('click',()=>{
    if(image_preview.children.length === 9){
        image_preview.innerHTML= ''
    }
})

image_submit_btn.addEventListener('change',()=>{

    var read_already = [];
    var image_file = image_submit_btn.files

    for(var i=0; i<image_file.length; i++){
       
        var url_section ={"url":URL.createObjectURL(image_file[i])}        
        read_already.push(url_section)}

    async function sending_data(){
        var worker = new Worker('/js/worker.js')
        worker.postMessage({input: image_file})
        worker.onmessage = function(e){

            image_src.value = e.data
            console.log(image_src.value)
    }
    }

    async function preview_promise(){
        for(var start=0; start<read_already.length; start++){

            var image_insert_box = document.createElement('a')
            image_insert_box.className = 'image_insert_box'
            image_insert_box.style.width = '100px'
            image_insert_box.style.height = '100px'
        
        
        
            var image_source = new Image()

            image_source.onload = function(){
                // console.log(this)
                // console.log(submit_data.toString())

                if(this.height>this.width){
                    this.style.aspectRatio = '3/4'
                    this.style.maxWidth = '50px'
                    this.style.maxHeight = 'fit-content'
                }
                else{
                    this.style.aspectRatio = '4/3'
                    this.style.maxWidth = '75px'
                    this.style.maxHeight = 'fit-content'
                }
                submit_data.push({image_url : this.src})
                image_src.value = JSON.stringify(submit_data)      
            }
            image_source.src = read_already[start].url
        
            image_insert_box.href = `${read_already[start].url}`
            image_insert_box.target = `${read_already[start].url}`
        
            image_source.className = 'image_inserted'
            image_preview.append(image_insert_box)
            image_insert_box.append(image_source)

        }

    }

    async function preview_promise_largerThan9(){
        var over_image_source =(image_preview.children.length+image_file.length)-9

        for(var start_sub=0; start_sub<image_file.length-over_image_source; start_sub++){
            var image_insert_box = document.createElement('a')
            image_insert_box.className = 'image_insert_box'
            image_insert_box.style.width = '100px'
            image_insert_box.style.height = '100px'
        
        
            var image_source = new Image()

            image_source.onload = function(){
                if(this.height>this.width){
                    this.style.aspectRatio = '3/4'
                    this.style.maxWidth = '50px'
                    this.style.maxHeight = 'fit-content'
                }
                else{
                    this.style.aspectRatio = '4/3'
                    this.style.maxWidth = '75px'
                    this.style.maxHeight = 'fit-content'
                }
            }
            image_source.src = read_already[start_sub].url
        
            image_insert_box.href = `${read_already[start_sub].url}`
            image_insert_box.target = `${read_already[start_sub].url}`
        
            image_source.className = 'image_inserted'
            image_preview.append(image_insert_box)
            image_insert_box.append(image_source)
        }
        image_src.value = image_preview

    }


if(image_preview.children.length+image_file.length<=9){
    preview_promise().then(
        sending_data()
    )
}

else{
    preview_promise_largerThan9();
    alert('해당 폼은 접수가능한 이미지 파일을 최대 9개로 제한합니다')

}

})