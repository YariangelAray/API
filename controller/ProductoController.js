import Producto from "../Models/Producto.js";

class ProductoController{

  // Método para obtener todos los productos
  static getAllProductos = async (req, res) => {
  
    try {

      const objProducto = new Producto();
  
      const productos = await objProducto.getAll();
  
      res.json(productos); 
        
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }
  
  // Método para crear un producto
  static createProducto = async (req, res) => {
      
    try {
      const { nombre, descripcion, precio, categoria_id } = req.body;
  
      const objProducto = new Producto();
      const producto = await objProducto.create(nombre, descripcion, precio, categoria_id);
      
      res.status(201).json({mensaje: "Producto creado", producto: producto});

    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }

  // Método para actualizar un producto
  static updateProducto = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, categoria_id } = req.body;
  
      const objProducto = new Producto();
      const producto = await objProducto.update(id, nombre, descripcion, precio, categoria_id);
      
      res.status(201).json({mensaje: "Producto actualizado", precio: producto});

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Método para actualizar parcialmente un producto
  static updateParcialProducto = async (req, res) => {
    try {
      const { id } = req.params;

      // Obtenemos las propiedades que se desean actualizar
      const propiedades = req.body;
  
      const objProducto = new Producto();
        
      await objProducto.updatePatch(id, propiedades);

      res.status(201).json({ mensaje: "Producto actualizado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Método para eliminar un producto
  static deleteProducto = async (req, res) => {
    try {
      const { id } = req.params;
  
      const objProducto = new Producto();
        
      await objProducto.delete(id);

      res.status(201).json({ mensaje: "Producto eliminado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default ProductoController;