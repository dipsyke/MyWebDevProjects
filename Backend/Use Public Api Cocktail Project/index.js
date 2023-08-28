import express from "express";
import bodyParser from "body-parser";
import axios from "axios"


const app = express();
const port = 3030;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {drinkToDisplay: null});
});
app.post("/get-cocktail", async (req, res) => {
        try {
            const firstLetterOfName = req.body.name[0];

            const result = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetterOfName}`)
            console.log(firstLetterOfName)
            console.log(result.data)
            const randomNumber= Math.floor(Math.random() * result.data.drinks.length);
            res.render("index.ejs", {
                drinkToDisplay: {
                    name: result.data.drinks[randomNumber].strDrink,
                    category: result.data.drinks[randomNumber].strCategory,
                    alcoholLevel: result.data.drinks[randomNumber].strAlcoholic,
                    thumbnail: result.data.drinks[randomNumber].strDrinkThumb
                }
            })
        } catch (error) {
            console.log(error)
            res.status(500)
        }

    }
)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});