import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3023;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;

    res.render("index.ejs", { activityToDisplay: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  try {
    let chosenType = req.body.type
    let chosenParticipants = req.body.participants
    const upstreamResponse = await axios.get(`https://bored-api.appbrewery.com/filter?type=${chosenType}&participants=${chosenParticipants}`);
    console.log('response HERE:', upstreamResponse.data)
    const result = upstreamResponse.data;
    let randomChosenActivity = result[Math.floor(Math.random() * result.length)+1];

    res.render("index.ejs", { activityToDisplay: randomChosenActivity });
  } catch (error) {
    let errorMessage = "No activities that match your criteria.";
    res.render("index.ejs", {error: errorMessage
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
