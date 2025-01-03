import Pure_Router from '../../0.0_Pure_Router/pure_router.js'

class Google_Map_API extends Pure_Router {

    constructor(){
    super()
    }

    Manage_google_map_API(){

        this.Pure_Router.get('/fetch_start_spot/:input',async (req,res)=>{

            const params = new URLSearchParams({
                fields: 'geometry,name,formatted_address,photos',
                input: `${req.params.input}`,
                inputtype:'textquery',
                key:`${process.env.REACT_APP_API}`
            })
    
            let result = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${params}`,{
                method: 'GET'
            })

            let data = await result.json()

                res.json(data)
        })

        this.Pure_Router.get('/fetch_img/:spot', async (req, res)=>{

            const params = new URLSearchParams({
                maxwidth: 400,
                photo_reference:`${req.params.spot}`,
                key:`${process.env.REACT_APP_API}`
            })
    
            let result = await fetch(`https://maps.googleapis.com/maps/api/place/photo?${params}`,{
                method: 'GET'
            })
            
            res.json({src: result.url})            
            
        })

        this.Pure_Router.get('/fetch_nearbyresult/:type/:lat/:lng/:distance', async (req, res)=>{

            const type_input = JSON.parse(decodeURIComponent(req.params.type))
            const lat_input = Number(req.params.lat.replaceAll('_','.'))
            const lng_input = Number(req.params.lng.replaceAll('_','.'))
            const distance_input = Number(req.params.distance)

            const params = {
                "includedTypes": type_input,
                "maxResultCount": 3,
                "locationRestriction": {
                    "circle": {
                    "center": {
                        "latitude": lat_input,
                        "longitude": lng_input},
                    "radius": distance_input
                    }
                }
            }

            let nearbyresult = await fetch(`https://places.googleapis.com/v1/places:searchNearby?languageCode=ko`,{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'X-Goog-api-Key':'AIzaSyBw0X4pec-WCEWCcNz-tmNDEqo9XiZyNdM',
                    'X-Goog-FieldMask':`places.name,places.displayName,places.shortFormattedAddress,places.location,places.photos,places.types,places.regularOpeningHours,places.rating,places.nationalPhoneNumber`
                },
                body: JSON.stringify(params)
            })

            let data = await nearbyresult.json()
            res.json(data)
        })

        this.Pure_Router.post('/fetch_nearbyresult_img',async (req,res)=>{
            
            const params = new URLSearchParams({
                key: 'AIzaSyBw0X4pec-WCEWCcNz-tmNDEqo9XiZyNdM',
                maxWidthPx: 400
            })

            let spot_list = req.body

            for(let i=0; i<spot_list.length; i++){
                for(let s=0; s<1; s++){

                    let src = spot_list[i].photos[s].name
                    let img_src = await fetch(`https://places.googleapis.com/v1/${src}/media?${params}`)
                                
                    spot_list[i].photos[s] = {img_src : `${img_src.url}`}

                }
            }

            
            res.json({data: spot_list})


            })
    
        this.Pure_Router.get('/fetch_getDetail/:placeid', async (req, res)=>{

            const params = req.params.placeid

            let getDetail = await fetch(`https://places.googleapis.com/v1/places/${params}?languageCode=ko`,{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                    "X-Goog-Api-Key":`${process.env.REACT_APP_API}` ,
                    "X-Goog-FieldMask":"displayName,formattedAddress,nationalPhoneNumber,types,photos,location,reviews"
                }
            })

            let getDetail_result = await getDetail.json()
            res.json({data: getDetail_result})

        })
    
    
    
    }
}

let google_map_api = new Google_Map_API()
google_map_api.Manage_google_map_API()
let Google_Map_Api_Routes = google_map_api.Pure_Router
export {Google_Map_Api_Routes}