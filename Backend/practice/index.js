import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3007;
let numberOfPlayers = 0;

app.use(express.static('public'))

app.get("/", (req, res) => {
        res.sendFile(__dirname + "/public/index.html")
    }
);
app.use(bodyParser.urlencoded({extended: true}));
app.get("/submit", (req, res) => {
    numberOfPlayers++;
    console.log(numberOfPlayers);
    if (numberOfPlayers % 5 == 0) {
        res.sendFile(__dirname + "/public/win.html");
    } else {
        res.sendFile(__dirname + "/public/loose.html")
    }

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// function checkIfPlayerIsWinner (numberOfPlayers){
//     if(numberOfPlayers%5==0){
//
//     }
// }

