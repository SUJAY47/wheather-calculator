const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res){
  const place = req.body.city;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+place+"&units=metric&appid=5e0ba6dd2b6904e49efd6bc2291f3531";
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const wheatherData = JSON.parse(data);
      const temp = wheatherData.main.temp;
      const des = wheatherData.weather[0].description;
      const img = wheatherData.weather[0].icon;
      const url2 = "http://openweathermap.org/img/wn/"+img+"@2x.png";
      res.write("<h1>the temperature is "+temp+"</h1>");
      res.write("<h3>cloud condition is "+des+"<h3>");
      res.write("<img src="+url2+">");
      res.send();
    });
  });
});




app.listen(3000, function(){
  console.log("port 3000 is running");
});
