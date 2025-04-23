import Categoria from "../Models/Categoria.js";
import Producto from "../Models/Producto.js";

class CategoriaService{

    // Agregar productos a una categoria de una lista de categorias
    async agregarProductos(categorias) {
        const objProducto = new Producto();
        return Promise.all(categorias.map(async (categoria) => {
            const productos = await objProducto.getProductosByIdCategoria(categoria.id);

            categoria.productos = productos;

            return categoria;
        }));
    }

    // Método para obtener todas las categorías con sus productos
    async getAllCategoriasProductos(){
        try {
            const objCategoria = new Categoria();
            const categorias = await objCategoria.getAll();
            const categoriasConProductos = await this.agregarProductos(categorias);
            return categoriasConProductos;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Método para obtener una categoría por id con sus productos
    async getByIdCategoriaProductos(id){
        try {
            const objCategoria = new Categoria();
            const categoria = await objCategoria.getById(id);
            const categoriaConProductos = await this.agregarProductos(categoria);
            return categoriaConProductos[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default CategoriaService;