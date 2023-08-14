import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const defaultTitle = "Type in your name";

app.get("/", (req, res) => {
    res.render("index.ejs", {title: defaultTitle});
})
app.use(bodyParser.urlencoded({extended: true}));


app.post("/submit", (req, res) => {

    let nameLength = calculateNameLength(req.body)
    let title;
    if (nameLength == 0) {
        title = defaultTitle;
    } else {
        title = `Your name has ${nameLength} characters`
    }
    res.render("index.ejs", {title: title})
});

function calculateNameLength(requestBody) {
    let fNameLength = requestBody["fName"].length;
    let lNameLength = requestBody["lName"].length;
    return fNameLength + lNameLength;
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

