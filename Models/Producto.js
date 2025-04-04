import connection from "../utils/db.js";

class Producto{

    // constructor(nombre, descripcion, precio, categoria_id){
    //     this.nombre = nombre;
    //     this.descripcion = descripcion;
    //     this.precio = precio;
    //     this.categoria_id = categoria_id;
    // }


    // Método para obtener todos los productos de la base de datos
    async getAll() {
        try {
            
            const [rows] = await connection.query("SELECT * FROM productos");
            return rows;

        } catch (error) {
            throw new Error("Error al obtener los productos.")
        }
    }

    // Método para crear un producto
    async create(nombre, descripcion, precio, categoria_id) {
        try {
          const [result] = await connection.query("INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES (?, ?, ?, ?)", [nombre, descripcion, precio, categoria_id]);

          return {             
            nombre,
            descripcion,
            precio,
            categoria_id };

        } catch (error) {
            throw new Error("Error al crear el producto.");
        }
    }

    // Método para actualizar un producto
    async update (id, nombre, descripcion, precio, categoria_id){
        try {
            const [result] = await connection.query("UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria_id = ? WHERE id = ?", [nombre, descripcion, precio, categoria_id, id]);

            // Si no se actualizó ningún registro, lanzamos un error
            if (result.affectedRows === 0) {
                throw new Error("Producto no encontrado.");
            }

            return { 
                id,
                nombre,
                descripcion,
                precio,
                categoria_id };

        } catch (error) {
            throw new Error(error.message || "Error al actualizar el producto.");
        }
    }

    // Método para actualizar parcialmente un producto
    async updatePatch(id, propiedades) {
        try {

            let sentencia = "";
            // Recorremos el objeto propiedades y construimos la sentencia SQL
            // para actualizar solo los campos que se han enviado
            for (const key in propiedades) {        
                sentencia += `${key} = "${propiedades[key]}", `;
            }            

            // Eliminamos la última coma y espacio
            sentencia = sentencia.slice(0, -2);   
            
            const [result] = await connection.query(`UPDATE productos SET ${sentencia} WHERE id = ?`, [id]);

            // Si no se actualizó ningún registro, lanzamos un error
            if (result.affectedRows === 0) {
                throw new Error("Producto no encontrado.");
            }

        } catch (error) {
            throw new Error(error.message || "Error al actualizar el producto.");
        }
    }

    // Método para eliminar un producto
    async delete(id){
        try {
            const [result] = await connection.query("DELETE FROM productos WHERE id = ?", [id]);

            // Si no se eliminó ningún registro, lanzamos un error
            if (result.affectedRows === 0) {
                throw new Error("Producto no encontrado.");
            }

        } catch (error) {
            throw new Error(error.message || "Error al eliminar el producto.");
        }
    }
}

export default Producto;