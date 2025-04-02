import express from "express";
import CategoriaController from "../controller/CategoriaController.js";
import { validarCategoria } from "../middlewares/validarCategoria.js";


const router = express.Router();

router.get('/' , CategoriaController.getAllCategorias);

router.post('/', validarCategoria ,CategoriaController.createCategoria);

router.put('/:id', validarCategoria, CategoriaController.updateCategoria);

router.delete('/:id', CategoriaController.deleteCategoria);

router.patch('/:id', CategoriaController.updateParcialCategoria);

export default router;