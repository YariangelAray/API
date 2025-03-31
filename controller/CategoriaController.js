import Categoria from "../Models/Categoria.js";

class CategoriaController{

  static getAllCategorias = async (req, res) => {

    try {

      const objCategoria = new Categoria();

      const categorias = await objCategoria.getAll();

      res.json(categorias); 
      
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }

  static createCategoria = async (req, res) => {
    
    try {
      const { nombre, descripcion } = req.body;
  
      const objCategoria = new Categoria(nombre, descripcion);
      const categoria = await objCategoria.create();
      
      res.status(201).json(categoria);

    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }
  
}

export default CategoriaController;