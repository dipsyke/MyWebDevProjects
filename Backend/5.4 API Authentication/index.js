import express from "express";
import axios from "axios";

const app = express();
const port = 3025;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "dipsy";
const yourPassword = "password";
const yourAPIKey = "9a371c06-43a3-4cbd-a817-8bb603dce2f7";
const yourBearerToken = "46b51521-9ba7-4ccb-bc1d-1505b7aa9698";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.

  const response = await axios.get('https://secrets-api.appbrewery.com/random');
  const upstreamResponseBody = response.data;
  const content = JSON.stringify(upstreamResponseBody)
  res.render("index.ejs", {content: content})

});

app.get("/basicAuth", async (req, res) => {
  const response = await axios.get(`https://secrets-api.appbrewery.com/all?page=2`, {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
  });

  const content = JSON.stringify(response.data)
  res.render("index.ejs", {content: content})

  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908



});

app.get("/apiKey", async (req, res) => {

  const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`, {});

  const content = JSON.stringify(response.data)
  res.render("index.ejs", {content: content})

});

app.get("/bearerToken", async (req, res) => {
  const response = await axios.get( "https://secrets-api.appbrewery.com/secrets/42", {
    headers: {
      Authorization:`Bearer ${yourBearerToken}`
    },
  });

  const content = JSON.stringify(response.data)
  res.render("index.ejs", {content: content})

});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
