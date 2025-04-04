import Pure_Router from "../../0.0_Pure_Router/pure_router.js";

class Image_File_Loader extends Pure_Router {

    constructor() {
        super();
        this.dynamicImageData = {}; 
    }

    updateImageData(path, index, newData) {
        if (!this.dynamicImageData[path]) {
            this.dynamicImageData[path] = [];}
        
        this.dynamicImageData[path][index] = newData;
    }

    Add_HTTP_Image_Router(path, input, status, index) {
        
        switch (status) {
            
            case "single":
                this.Pure_Router.get(path + `/${index}`, (req, res) => {
                    const imageData = this.dynamicImageData[path]?.[index];

                    if (imageData) {
                        res.setHeader("Content-Type", "image/jpeg");
                        res.setHeader('Cache-Control', 'public, max-age=86400');  // 24시간 동안 캐시
                        res.setHeader('Expires', new Date(Date.now() + 86400000).toUTCString());  // 24시간 후 만료
                        res.end(imageData); 
                    } 
                    else {
                        res.status(404).send("Image not found");
                    }
                });
                
                this.updateImageData(path, index, input);
                break;

            case "array":
                this.Pure_Router.get(path + `/:index`, (req, res) => {
                    const idx = req.params.index;
                    const imageArray = this.dynamicImageData[path];

                    if (imageArray && imageArray[idx]) {
                        res.setHeader("Content-Type", "image/jpeg");
                        res.setHeader('Cache-Control', 'public, max-age=86400');  // 24시간 동안 캐시
                        res.setHeader('Expires', new Date(Date.now() + 86400000).toUTCString());
                        res.send(imageArray[idx]);
                    } 
                    else {
                        res.status(404).send("Image not found");
                    }
                });
                
                this.updateImageData(path, index, input);
                break;
        }
    }

}

const image_file_loader = new Image_File_Loader()
const Image_File_Loader_Router = image_file_loader.Pure_Router
export {image_file_loader ,Image_File_Loader_Router};