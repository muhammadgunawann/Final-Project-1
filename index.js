const express = require("express");
const db = require("./config/db");
const routes = require("./routes/router")
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes)

const PORT = process.env.PORT || 3000

db.connect(err => {
    if(err) {
        console.info(err.message);
    }else {
        console.info("Connected postgreSQL database");
    }
})


app.listen(PORT, () => {
    console.info(`Server running in http://localhost:${PORT}`);
})

