import express from "express";
import CategoriaController from "../controller/categoriaController.js";

const router = express.Router();

router.get('/' , CategoriaController.getAllCategorias);

router.post('/', CategoriaController.createCategoria);

router.put('/:id', (req, res) => {
  console.log(req.body);
});

export default router;