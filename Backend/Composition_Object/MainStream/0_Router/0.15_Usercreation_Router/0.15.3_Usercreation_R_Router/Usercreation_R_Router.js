import Pure_Router from "../../0.0_Pure_Router/pure_router.js"

import Database_Router_CUCM from "../../0.6_DataBase_Router_ClinetAccountManager/0.6.1_DataBase_Router_ClientUsercreationManager/database_router_CUCM.js"
import Database_Router_CAM from "../../0.6_DataBase_Router_ClinetAccountManager/database_router_CAM.js"

import { image_file_loader } from "../../0.10_Tools/0.10.7_Image_File_Loader/image_file_loader.js"

class Usercreation_R_Router extends Pure_Router {

    constructor(){
    super()
    }

    Manage_Loading_PostData_API(){

        this.Pure_Router.get('/read_reviews/user/:user_id', async (req,res)=>{

            const DB = new Database_Router_CUCM();
            const INPUT = Number(req.params.user_id)

            let reviews_data = await DB.Select_Post(['user_id'],[INPUT],'user_post','user_post',10)

            reviews_data.forEach((element, index) => {

                const single_review_data = element
                const picture_url_array = []
                const PICTURE_URL = `/imagedata/review/${single_review_data.id}`

                element.user_post_pictures.forEach((e, index)=>{
                    image_file_loader.Add_HTTP_Image_Router(
                        `/review/${single_review_data.id}`,
                        e, 'single', index, 'read'
                    )
                })

                element.user_post_pictures.forEach((e, index)=>{
                    picture_url_array.push(PICTURE_URL + `/${index}`)
                    element.picture_url_array = [...picture_url_array]
                })

                delete element.user_post_pictures
            });

            res.json({result:reviews_data})

        })

        this.Pure_Router.get('/read_review/:review_id/:user_id', async (req,res)=>{

            const DB = new Database_Router_CUCM();
            const INPUT_1 = Number(req.params.review_id)
            const INPUT_2 = Number(req.params.user_id)

            let review_data = await DB.Select_Post(['id', 'user_id'],[INPUT_1, INPUT_2],'user_post','user_post',1)
            const picture_url_array = []
            review_data = review_data[0]

                const PICTURE_URL = `/imagedata/review/${req.params.review_id}`

                image_file_loader.Add_HTTP_Image_Router(
                    `/review/${req.params.review_id}`,
                    review_data.user_post_pictures ,'array')
                
                review_data.user_post_pictures.forEach((e, index)=>{
                    picture_url_array.push(PICTURE_URL + `/${index}`)
                    review_data.picture_url_array = [...picture_url_array]
                })

            res.json({result:review_data})
        })

        this.Pure_Router.get('/read_reviews/place/:placecode', async (req,res)=>{

            const DB = new Database_Router_CUCM();
            const reviewer_DB = new Database_Router_CAM

            const INPUT = req.params.placecode

            const PlaceSearch_result = await DB.Select_Post(['placecode'],[INPUT],'user_post','user_post',10)

            if(PlaceSearch_result === undefined){
                res.json({result:[]})
                return;
            }

            for(const element of PlaceSearch_result){

                const single_review_data = element
                const picture_url_array = []
                const PICTURE_URL = `/imagedata/review/${single_review_data.id}`
                const PROFILE_IMG_URL = `/imagedata/reviewer/${single_review_data.user_id}`

                const Reviewer_Profile_result = await reviewer_DB.Select_User(['id'],[single_review_data.user_id])

                    image_file_loader.Add_HTTP_Image_Router(
                        `/reviewer/${single_review_data.user_id}`,
                        Reviewer_Profile_result.picture, 'single', 0, 'read'
                    )

                console.log(Reviewer_Profile_result)
                element.reviewer_name = Reviewer_Profile_result.name
                element.reviewer_profile = [PROFILE_IMG_URL + `/0`]

                element.user_post_pictures.forEach((e, index)=>{
                    image_file_loader.Add_HTTP_Image_Router(
                        `/review/${single_review_data.id}`,
                        e, 'single', index, 'read'
                    )
                })

                element.user_post_pictures.forEach((e, index)=>{
                    picture_url_array.push(PICTURE_URL + `/${index}`)
                    element.picture_url_array = [...picture_url_array]
                })

                delete element.user_post_pictures
            };

            res.json({result:PlaceSearch_result})
        })
        
    }

}

let usercreation_r_router = new Usercreation_R_Router()
usercreation_r_router.Manage_Loading_PostData_API()

let Usercreation_R_Routes = usercreation_r_router.Pure_Router
export default Usercreation_R_Routes;