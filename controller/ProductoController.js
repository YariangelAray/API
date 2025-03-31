import Producto from "../Models/Producto.js";
import connection from "../utils/db.js";

class ProductoController{

    static getAllProductos = async (req, res) => {
    
        try {
    
            const objProducto = new Producto();
        
            const productos = await objProducto.getAll();
        
            res.json(productos); 
            
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    
    static createProducto = async (req, res) => {
        
        try {
            const { nombre, descripcion, precio, categoria_id } = req.body;

            const [categoria] = await connection.query("SELECT * FROM categorias WHERE id = ?", [categoria_id]);
            if(categoria.length === 0) {
                return res.status(404).json({ error: "Categoría inexistente" });
            }
        
            const objProducto = new Producto(nombre, descripcion, precio, categoria_id);
            const producto = await objProducto.create();
            
            res.status(201).json(producto);
    
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

export default ProductoController;