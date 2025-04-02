import connection from "../utils/db.js";

class Producto{

    constructor(nombre, descripcion, precio, categoria_id){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.categoria_id = categoria_id;
    }

    async getAll() {
        try {
            //Accedemos a la primera posición del arreglo retornado por la conección
            const [rows] = await connection.query("SELECT * FROM productos"); //Enviamos el código SQL      
            return rows;

        } catch (error) {
            //Lanzamos un error perzonalido
            throw new Error("Error al obtener los productos.")
        }
    }

    async create() {
        try {
          const [result] = await connection.query("INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES (?, ?, ?, ?)", [this.nombre, this.descripcion, this.precio, this.categoria_id]);
          
          if (result.affectedRows === 0) {
            throw new Error("Categoría inexistente.");
          }

          return { 
            id: result.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            categoria_id: this.categoria_id };

        } catch (error) {
            throw new Error("Error al crear el producto.");
        }
    }
}

export default Producto;