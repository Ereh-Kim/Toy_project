import crypto from 'crypto';

let Password_Genarator = class Tool {

constructor(){
}

genarate_password(length){
    const Random_Num = crypto.randomBytes(16)
    const password = Random_Num.toString('hex').slice(0,length)
    return password
}

}

let password_genarator = new Password_Genarator

export {Password_Genarator}
