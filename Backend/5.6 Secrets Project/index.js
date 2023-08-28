// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.

import express from "express";
import axios from "axios";

const app = express();
const port = 3028;

app.use(express.static("public"))

app.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://secrets-api.appbrewery.com/random")

        res.render("index.ejs", {secret: result.data.secret, user: result.data.username})
    } catch (error) {
        console.log(error.response.data)
        res.status(500)
    }
})

/**
 * learn to build own api - below
 */
app.get("/sum-numbers", async (req, res) => {
    try {
        console.log(req.query)
        const a = parseInt(req.query.a);
        const b = parseInt(req.query.b);
        const kiskacsa = parseInt(req.query.kiskacsa);

        res.json({
            originalA: a,
            originalB: b,
            originalKiskacsa: kiskacsa,
            sum: a + b + kiskacsa
        })
    } catch (error) {
        console.log(error.response.data)
        res.status(500)
    }
})


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});