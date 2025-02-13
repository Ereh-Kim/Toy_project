import Pure_Router from "../../0.0_Pure_Router/pure_router.js";

class Image_File_Loader extends Pure_Router {

    constructor(){
    super()
    }

    Add_HTTP_Image_Router(path, input, status, index){

        switch(status){
           
            case('single'):
                this.Pure_Router.get(path + `/:${index}`, (req, res)=>{
                    res.setHeader('Content-Type', 'image/jpeg')
                    res.setHeader('Content-Length', input.length)
                    res.end(input)
                })
                break;

            case('array'):
                this.Pure_Router.get(path + '/:index', (req, res)=>{
                    const TargetImage = input[req.params.index]
                    
                    res.setHeader('Content-Type', 'image/jpeg')
                    res.setHeader('Content-Length', input.length)
                    res.send(TargetImage)
                })
                break;
        }
    
    }

}

const image_file_loader = new Image_File_Loader()
const Image_File_Loader_Router = image_file_loader.Pure_Router
export {image_file_loader ,Image_File_Loader_Router};