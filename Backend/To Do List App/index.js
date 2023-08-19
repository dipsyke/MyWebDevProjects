import express, {request} from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3022;
let workList = [];
let todayList = [];

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/work", (req, res)=>{
    res.render("worklist.ejs", {worklist: workList});
});
app.post("/work", (req, res) => {
   console.log(req.body)
    let newItemWork = req.body.newItemWork;
    if(newItemWork.length!==0) {
        workList.push(newItemWork)
    }

    res.render("worklist.ejs", {worklist: workList});
})




app.get("/today", (req, res)=>{
    res.render("todaylist.ejs", {todaylist: todayList});
});
app.post("/today", (req, res) => {
    console.log(req.body)
    let newItemToday = req.body.newItemToday;
    if(newItemToday.length!==0) {
        todayList.push(newItemToday)
    }

    res.render("todaylist.ejs", {todaylist: todayList});
})
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});
