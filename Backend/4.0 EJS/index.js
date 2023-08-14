import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3008;


const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date();
let day = weekday[d.getDay()];
console.log(day)
let typeOfDay = null;
let activity = null;

if(day=="Saturday" || day =="Sunday"){
typeOfDay = "the weekend"
}else{
    typeOfDay = "a weekday"
};

if(typeOfDay=="the weekend"){
    activity="have fun"
}else{
    activity="work hard"
};

app.get("/", (req, res)=> {
    res.render("index.ejs", {
        typeOfDay: typeOfDay,
        activity: activity,
    })
})

app.use(bodyParser.urlencoded({extended: true}));
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});