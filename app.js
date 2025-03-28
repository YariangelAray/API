import express from "express";
import bodyParser from "body-parser";
import categoriaRoutes from "./routes/categoriaRoutes.js";

const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded({"extended":true}))

app.use("/categorias", categoriaRoutes);

app.listen(3000, () => {
  console.log("Hola");  
});