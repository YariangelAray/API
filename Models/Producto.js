import connection from "../utils/db.js";

class Producto{

    // constructor(nombre, descripcion, precio, categoria_id){
    //     this.nombre = nombre;
    //     this.descripcion = descripcion;
    //     this.precio = precio;
    //     this.categoria_id = categoria_id;
    // }

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

    async create(nombre, descripcion, precio, categoria_id) {
        try {
          const [result] = await connection.query("INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES (?, ?, ?, ?)", [nombre, descripcion, precio, categoria_id]);
          
          if (result.affectedRows === 0) {
            throw new Error("Categoría inexistente.");
          }

          return { 
            id: result.id,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            categoria_id: categoria_id };

        } catch (error) {
            throw new Error("Error al crear el producto.");
        }
    }

    async update (id, nombre, descripcion, precio, categoria_id){
        try {
            const [result] = await connection.query("UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria_id = ? WHERE id = ?", [nombre, descripcion, precio, categoria_id, id]);

            if (result.affectedRows === 0) {
                throw new Error("Producto no encontrado.");
            }

            return { 
                id: id,
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                categoria_id: categoria_id };

        } catch (error) {
            throw new Error("Error al actualizar el producto.");
        }
    }

    async updatePatch(id, propiedades) {
        try {
            let sentencia = "";
            for (const key in propiedades) {        
                sentencia += `${key} = "${propiedades[key]}", `;
            }            
            sentencia = sentencia.trim().slice(0, -1);   
            
            const [result] = await connection.query(`UPDATE productos SET ${sentencia} WHERE id = ?`, [id]);

            if (result.affectedRows === 0) {
                throw new Error("Producto no encontrado.");
            }

        } catch (error) {
            throw new Error("Error al actualizar el producto.");
        }
    }

    async delete(id){
        try {
            const [result] = await connection.query("DELETE FROM productos WHERE id = ?", [id]);

            if (result.affectedRows === 0) {
                throw new Error("Producto no encontrado.");
            }

        } catch (error) {
            throw new Error("Error al eliminar el producto.");
        }
    }
}

export default Producto;