const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res)=> {
    res.render("index")
})

app.listen(process.env.PORT || port, () => {
    console.log(`Server is at http://localhost:${port}`)
})
