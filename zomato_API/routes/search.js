module.exports=(search,client)=>{
    search.get('/',(req,res)=>{
        res.render('search')
    })

    search.post('/restaurants',(req,res)=>{
        let city=req.body.city;
        var main_data=[]
        client.getLocations({query: city}, (err, result)=>{
            result=JSON.parse(result)
            if(err||result.location_suggestions.length<1){
                res.json({message:'city is not exist'})
            }else {
                console.log(result)
                client.getGeocode({
                    lat: result.location_suggestions[0].latitude, //latitude
                    lon: result.location_suggestions[0].longitude,//longitude
                    count:'4'
                    }, (err, result2)=>{
                        if(!err){
                        result2=JSON.parse(result2);
                        result2=result2.nearby_restaurants;
                        for(let i of result2){
                              let dict={}
                              dict['name']=i.restaurant.name
                              dict['average_cost']=(i.restaurant.average_cost_for_two)
                              dict['cuisines']=(i.restaurant.cuisines)
                              dict['image_url']=(i.restaurant.featured_image)
                              dict['online_delivery']=(i.restaurant.has_online_delivery)
                              dict['location']=(i.restaurant.location)
                              dict['price_range']=(i.restaurant.price_range)
                              dict['url']=(i.restaurant.url)
                              main_data.push(dict)
                              console.log(main_data)
                            }
                            res.render('home',{main_data})
                        }else {
                            console.log(err);
                        }
                    });
                    
                
        }
        })
        });
    
    
}