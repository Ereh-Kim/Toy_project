import Pure_Router from '../../0.0_Pure_Router/pure_router.js'

class Google_Map_API extends Pure_Router {

    constructor(){
    super()
    }

    Manage_google_map_API(){

        this.Pure_Router.get('/fetch_address/:lat/:lng',async (req,res)=>{

            const lat = req.params.lat
            const lng = req.params.lng

            let result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_API}&language=ko`,{
                method: 'GET'
            })

            let data = await result.json()
            

            if(data.results !== undefined && data.results.length >0){
                data = data.results[0].formatted_address
            }

            res.json(data)
        })

        this.Pure_Router.get('/fetch_start_spot/:input',async (req,res)=>{

            const params = new URLSearchParams({
                fields: 'geometry,name,formatted_address,photos,type,place_id',
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

        this.Pure_Router.get('/fetch_start_spot_ver_new/:input',async (req,res)=>{

            const params = {
                textQuery: `${req.params.input}`,
                rankPreference: 'DISTANCE'
                }
    
            let result = await fetch(`https://places.googleapis.com/v1/places:searchText`,{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'X-Goog-api-Key':'AIzaSyBw0X4pec-WCEWCcNz-tmNDEqo9XiZyNdM',
                    'X-Goog-FieldMask':`places.name,places.displayName,places.formattedAddress,places.location,places.photos,places.types`
                },
                body: JSON.stringify(params)}
            )

            let data = await result.json()
                console.log(data)
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
            let nearbyresult;
            let data;

            let params = {
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


            switch(type_input.length > 1){
                case(true):
                    console.log('more than 1 request')
                    const requestLength = type_input.length
                    nearbyresult = [];
                    
                    for(let i=0; i<requestLength; i++){
                        
                        params = {
                            "includedTypes": [type_input[i]],
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
                        

                        const InstanceRequest = await fetch(`https://places.googleapis.com/v1/places:searchNearby?languageCode=ko`,{
                            method: 'POST',
                            headers: {
                                'Content-Type':'application/json',
                                'X-Goog-api-Key':'AIzaSyBw0X4pec-WCEWCcNz-tmNDEqo9XiZyNdM',
                                'X-Goog-FieldMask':`places.name,places.displayName,places.shortFormattedAddress,places.location,places.photos,places.types,places.regularOpeningHours,places.rating,places.nationalPhoneNumber`
                            },
                            body: JSON.stringify(params)
                        })

                        const InstanceRequest_JSON = await InstanceRequest.json()
                        nearbyresult = [...nearbyresult, ...InstanceRequest_JSON.places]
                        
                        data = {places: nearbyresult}
                    }
                break;

                case(false):
                    console.log('1 request')

                    nearbyresult = await fetch(`https://places.googleapis.com/v1/places:searchNearby?languageCode=ko`,{
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/json',
                            'X-Goog-api-Key':'AIzaSyBw0X4pec-WCEWCcNz-tmNDEqo9XiZyNdM',
                            'X-Goog-FieldMask':`places.name,places.displayName,places.shortFormattedAddress,places.location,places.photos,places.types,places.regularOpeningHours,places.rating,places.nationalPhoneNumber`
                        },
                        body: JSON.stringify(params)
                    })
                    data = await nearbyresult.json()
                    
                    break;
            }
            res.json(data)
        })

        this.Pure_Router.post('/fetch_nearbyresult_img',async (req,res)=>{
            
            const params = new URLSearchParams({
                key: 'AIzaSyBw0X4pec-WCEWCcNz-tmNDEqo9XiZyNdM',
                maxWidthPx: 400
            })

            let spot_list = req.body

            for(let i=0; i<spot_list.length; i++){
                
                if(spot_list[i].photos === undefined){
                    break;
                }
                
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
                    "X-Goog-FieldMask":"displayName,formattedAddress,nationalPhoneNumber,types,location,reviews,googleMapsUri"
                }
            })

            let getDetail_result = await getDetail.json()
            res.json({data: getDetail_result})

            })
    
        this.Pure_Router.get('/fetch_currentLocation', async (req, res)=>{

            

            const currentLocation = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'X-Goog-api-Key':`${process.env.REACT_APP_API}`
                }
            })

            const data = await currentLocation.json()
            res.json({data: data})

        })
    
    }
}

let google_map_api = new Google_Map_API()
google_map_api.Manage_google_map_API()
let Google_Map_Api_Routes = google_map_api.Pure_Router
export {Google_Map_Api_Routes}