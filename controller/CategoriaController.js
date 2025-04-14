import Categoria from "../Models/Categoria.js";
import CategoriaService from "../service/CategoriaService.js";

class CategoriaController{

  // Método para obtener todas las categorías
  static getAllCategorias = async (req, res) => {

    try {

      const objCategoria = new CategoriaService();

      const categorias = await objCategoria.getAllCategoriasProductos();

      res.json(categorias); 
      
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }

  // Obtener categoria por id
  static getCategoriaById = async (req, res) => {
    try {

      const { id } = req.params;

      const objCategoria = new CategoriaService();

      const categoria = await objCategoria.getByIdCategoriaProductos(id);

      res.json(categoria);    

    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }

  // Método para crear una categoria 
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

  // Método para actualizar una categoria
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
      
      res.status(201).json({ mensaje: "Categoria eliminada con exito." });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  
}

export default CategoriaController;