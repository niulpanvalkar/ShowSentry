import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import mongoose from "mongoose";


dotenv.config();

const port = process.env.PORT || 9000;
const app = express();

mongoose.connect(process.env.DATABASE);

mongoose.connection.on("connected", () => {
  console.log("Connected to database ");
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send(`Server is up and running`)
  })

app.listen(port, () => {
    console.log(`Server started on port ${port}` );
});

app.use("/api/v1", routes);