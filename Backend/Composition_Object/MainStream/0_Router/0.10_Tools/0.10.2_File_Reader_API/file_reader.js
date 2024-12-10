import fs from 'fs/promises'

let File_Reader = class Tool {

    constructor(){
        this.fs = fs
    }

    async read_file(imagePath){

        let result = await this.fs.readFile(imagePath, null, async (err, data)=>{
            if(err){console.error(`잘못된 이미지 경로`,err)}            
        })

        return result
    }

}

export {File_Reader}