import multer from 'multer'

export const file_downloader = class Tool {

    constructor(target){

        const storage = multer.diskStorage({
            destination: (req, file, cb)=>{
                cb(null, 'uploads/')
            },
            filename: (req, file, cb)=>{
                cb(null, Date.now() + '_' + file.originalname)
            }
        })
        const upload = multer({storage: storage})
        this.option = upload.array(target, 10)
    }

    async Manage_File_download (){
    
    }

}

export default file_downloader;