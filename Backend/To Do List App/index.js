import express, {request} from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3022;
let workList = [];
let todayList = [];

let currentAutoIncrementValue = 1

function getNewUniqueId() {
    const valueToReturn = currentAutoIncrementValue
    ++currentAutoIncrementValue
    return valueToReturn
}


app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/work", (req, res) => {
    res.render("taskList.ejs", {title: 'Work', taskList: workList});
});
app.post("/work", (req, res) => {
    console.log(req.body)
    let action = req.body.action;

    if (action === "createNewTask") {
        let newItemWork = req.body.newItem;
        if (newItemWork.length !== 0) {
            workList.push({
                id: getNewUniqueId(),
                name: newItemWork,
                isDone: false
            })
        }
    }

    if (action === "setTaskState") {
        let taskId = parseInt(req.body.taskId);
        let newState = req.body.newState === "true";

        let taskToModify = workList.find((element) => element.id === taskId)
        taskToModify.isDone = newState
    }
    res.render("taskList.ejs", {title: 'Work', taskList: workList});
})


app.get("/today", (req, res) => {
    res.render("taskList.ejs", {title: 'Today', taskList: todayList});
});
app.post("/today", (req, res) => {
    console.log(req.body)
    let action = req.body.action;

    if (action === "createNewTask") {
        let newItemToday = req.body.newItem;
        if (newItemToday.length !== 0) {
            todayList.push({
                id: getNewUniqueId(),
                name: newItemToday,
                isDone: false
            })
        }
    };

    if (action === "setTaskState") {
        let taskId = parseInt(req.body.taskId);
        let newState = req.body.newState === "true";

        let taskToModify = todayList.find((element) => element.id === taskId)
        taskToModify.isDone = newState
    }

    res.render("taskList.ejs", {title: 'Today', taskList: todayList});
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
