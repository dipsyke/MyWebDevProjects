import express from "express"
const app = express();
const port = 3001

app.listen(port, () => {
    console.log(`Server running on ${port}`)
});

// app.get("/", (req, res) => {
//     console.log(req.rawHeaders);
// });

app.get("/", (req, res) => {
    res.send("<h1> Helloka</h1>");
});

app.get("/contact", (req, res) =>{
    res.send("<h1>Contact Info</h1> <br> <p>Phone number: 556966657</p>")
});

app.get("/about", (req, res) => {
    res.send("Kindly fuck off")
});