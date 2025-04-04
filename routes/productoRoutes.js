import express from "express";
import ProductoController from "../controller/ProductoController.js";
import { validarProducto } from "../middlewares/validarProducto.js";

const router = express.Router();

router.get('/' , ProductoController.getAllProductos);

router.post('/', validarProducto, ProductoController.createProducto)

router.put('/:id', validarProducto, ProductoController.updateProducto);

router.patch('/:id', ProductoController.updateParcialProducto);

router.delete('/:id', ProductoController.deleteProducto);


export default router;