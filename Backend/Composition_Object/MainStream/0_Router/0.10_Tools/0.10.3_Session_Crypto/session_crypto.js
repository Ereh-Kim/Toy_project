import crypto from 'crypto';

import dotenv from 'dotenv'
dotenv.config()

let Session_Crypto = class Tool {

    constructor(){
        const key = Buffer.from(process.env.CRYPTO_KEY,'hex')
        const iv = Buffer.from(process.env.CRYPTO_IV,'hex')
        
        this.key= key
        this.iv = iv
    }

    async en_crypto(input){
        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv)
        
        let en_crypted_data = cipher.update(input, 'utf8', 'hex')
        en_crypted_data += cipher.final('hex')

        return en_crypted_data
    }

    async de_crypto(input){
        const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv )

        let de_crypto = decipher.update(input, 'hex', 'utf8')
        de_crypto += decipher.final('utf8')

        return de_crypto;
    }

}

export default Session_Crypto