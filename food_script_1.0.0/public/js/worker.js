onmessage = function(e){

var converted = [];

var reader = new FileReaderSync();
for(var i=0; i< e.data.input.length; i++){
converted.push(

   reader.readAsDataURL(e.data.input[i])
)}

postMessage({converted: converted,length: converted.length})
}