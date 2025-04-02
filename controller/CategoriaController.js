import Categoria from "../Models/Categoria.js";
import connection from "../utils/db.js";

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
      
      res.status(201).json({mensaje: "Categoria creada", categoria: categoria});

    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }

  static updateCategoria = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;

      const [categoriaExist] = await connection.query("SELECT * FROM categorias WHERE id = ?", [id]);
      if(categoriaExist.length === 0) {
          return res.status(404).json({ error: "Error al actualizar la categoría" });
      }
  
      const objCategoria = new Categoria(nombre, descripcion);
      const categoria = await objCategoria.update(id);
      
      res.status(201).json({mensaje: "Categoria actualizada", categoria: categoria});

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static deleteCategoria = async (req, res) => {
    try {
      const { id } = req.params;

      const [categoriaExist] = await connection.query("SELECT * FROM categorias WHERE id = ?", [id]);
      if(categoriaExist.length === 0) {
          return res.status(404).json({ error: "Error al eliminar la categoría" });
      }

      const objCategoria = new Categoria();
      await objCategoria.delete(id);
      
      res.status(201).json({ mensaje: "Categoria eliminada"});

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
}

export default CategoriaController;