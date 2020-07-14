const zomato = require('zomato');
const express=require('express');
const app=express();
const bodyParser=require('body-parser')
const port=process.env.PORT || 8080;

app.set('view engine', 'ejs');



app.use('/static',express.static('static'));

app.use(bodyParser.urlencoded({ extended: false }));

const client = zomato.createClient({
    userKey: '6123b65f78a300ea877e9d3154ff00bb', //as obtained from [Zomato API](https://developers.zomato.com/apis)
  });

let search=express.Router();
app.use('/',search)
require('./routes/search')(search,client)



//   client.getCategories(null, (err, result)=>{
//     if(!err){
//       console.log(result);
//     }else {
//       console.log(err);
//     }
// });



app.listen(port,()=>{
    console.log(`your app is listening at ${port}`)
})