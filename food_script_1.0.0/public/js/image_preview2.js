
    var profile_notice = document.getElementById('profile_image_change')
    var profile_upload = document.getElementById('profile_image');
    var profile_image_filename = document.getElementById('profile_image_filename')
    var profile_form = document.getElementById('profile_form')
    var profile_image_src = document.getElementById('profile_image_src')
    
    
    profile_upload.addEventListener('change', function() {
    
      const reader = new FileReader();
      reader.readAsDataURL(this.files[0]);
    
      profile_image_filename.innerHTML = `<span> 새롭게 적용할 이미지:<br> ${this.files[0].name}</span>`
    
      reader.addEventListener('load', () => {
        
        profile_image_src.value = `${reader.result}`;
        
        profile_notice.src = `${reader.result}`;
        
    
      });
    
    });