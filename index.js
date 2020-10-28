//console.log('this is working!')

let express = require('express');
let app = express();

// step 6 在数据返还时，只解析parses Content-Type header 符合的 type option; 让他理解req.body的数据
// body = 储存json file的string主体
let bodyParser = require('body-parser');
app.use(bodyParser.json());
//install in terminal npm install body-parser --save


// step 7 Database initialization
// data don't know each other, no relationship database. 数据库分两种 有关联和没关联。（taobao算有关联）,一个项目一个database

let DataStore = require('nedb');
let db = new DataStore('happy.db');
db.loadDatabase();
// install: npm install nedb --save


// create array for step 6.5
let HappyTracker =[];

//public folder
app.use('/',express.static('public'));

// step 6, create route on server, listening for a post request 听到信息时开始收集
app.post('/happyData',(req,res)=>{
    console.log("Received a POST request")
    //catch the body send from client site 解析数据再制作成server中的json格式
    // let happyObj = req.body;
    // console.log(happyObj);
    let currentDate=Date();
    let happyObj_post = {
        date: currentDate,
        name: req.body.name,
        Happy: req.body.Happiness  
    }
    //console.log(happyObj_post)
  
    // step 6.5 把数据(obj)装进array(coffeeTracker)
    HappyTracker.push(happyObj_post);
    console.log(HappyTracker);

 
    //step 7 storage data
    db.insert(HappyTracker);


    // send msg back to client, response 
    // client side : data send back - json (js: res= res=>{}
    res.json({task:"success"});
})


app.get('/getHappiness', (req,res)=> {
    let obj = {data: HappyTracker};
    res.json(obj);
})

app.listen(7000,()=>{
    console.log("localhost:7000")
})

// // add route get information
// app.get('/getAirQuality',(req,res)=>{
//     let obj = { data : airTracker };
//     res.json(obj);
// })
