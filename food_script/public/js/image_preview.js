
var profile_notice = document.getElementById('profile_image_change')
var profile_upload = document.getElementById('profile_image');
var profile_image_filename = document.getElementById('profile_image_filename')
var profile_form = document.getElementById('profile_form')
var profile_image_src = document.getElementById('profile_image_src')


profile_upload.addEventListener('change', function() {

  const reader = new FileReader();
  reader.readAsDataURL(this.files[0]);

  profile_notice.style.width = '50px';
  profile_notice.style.height = '50px';
  profile_notice.style.border = `3px white solid`;
  profile_notice.style.padding = `8px`;
  profile_notice.style.borderRadius = `15px`;

  profile_image_filename.innerHTML = `<p>업로드한 파일명:<br> ${this.files[0].name}</p>`
  profile_form.id = `profile_form_activate`

  reader.addEventListener('load', () => {
    
    profile_image_src.value = `${reader.result}`;
    
    profile_notice.src = `${reader.result}`;
    

  });

});
