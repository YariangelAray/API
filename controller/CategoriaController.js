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
  
      const objCategoria = new Categoria();
      const categoria = await objCategoria.create(nombre, descripcion);
      
      res.status(201).json({mensaje: "Categoria creada", categoria: categoria});

    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }

  static updateCategoria = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;          
  
      const objCategoria = new Categoria();
      const categoria = await objCategoria.update(id, nombre, descripcion);
      
      res.status(201).json({mensaje: "Categoria actualizada", categoria: categoria});

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static updateParcialCategoria = async (req, res) => {
    try {
      const { id } = req.params;

      const propiedades = req.body;
  
      const objCategoria = new Categoria();
       
      await objCategoria.updatePatch(id, propiedades);

      res.status(201).json({ mensaje: "Categoria actualizada" });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }  
  }

  static deleteCategoria = async (req, res) => {
    try {
      const { id } = req.params;

      const objCategoria = new Categoria();
      await objCategoria.delete(id);
      
      res.status(201).json({ mensaje: "Categoria eliminada"});

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  
}

export default CategoriaController;