import connection from "../utils/db.js";

class Categoria{

  // constructor(nombre, descripcion) {
  //   nombre = nombre;
  //   descripcion = descripcion;
  // }
  
  /**
   * Método para obtener los registros de la base de datos
   * @returns {Array} Listado de las categorías en un arreglo
   */

  async getAll() {
    try {
      //Accedemos a la primera posición del arreglo retornado por la conección
      const [rows] = await connection.query("SELECT * FROM categorias"); //Enviamos el código SQL      
      return rows;

    } catch (error) {
      //Lanzamos un error perzonalido
      throw new Error("Error al obtener las categorías.");
    }
  }

  async create(nombre, descripcion) {
    try {      

      const [result] = await connection.query("INSERT INTO categorias (nombre, descripcion) VALUES ( ?, ?)", [nombre, descripcion]);  
      
      return {
        id: result.id,
        nombre: nombre,
        descripcion: descripcion
      };

    } catch (error) {
      throw new Error("Error al crear la categoría.");
    }
  }

  async update(id, nombre, descripcion) {
    try {
      
      const [result] = await connection.query("UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?", [nombre, descripcion, id]);

      if (result.affectedRows === 0) {
        throw new Error("Categoría no encontrada.");
      }

      return {
        id: id,
        nombre: nombre,
        descripcion: descripcion
      };

    } catch (error) {
      throw new Error("Error al actualizar la categoría.");
    }
  }

  async updatePatch(id, propiedades) {
    try {

      let sentencia = "";
      for (const key in propiedades) {        
        sentencia += `${key} = "${propiedades[key]}", `;
      }            
      sentencia = sentencia.trim().slice(0, -1);   
      
      const [result] = await connection.query(`UPDATE categorias SET ${sentencia} WHERE id = ?`, [id]);

      if (result.affectedRows === 0) {
        throw new Error("Categoría no encontrada.");
      }

    } catch (error) {
      // throw new Error (error.message)
      throw new Error(`Error al actualizar la categoría.`);
    }
  }

  async delete(id) {
    try {
      
      const [result] = await connection.query("DELETE FROM categorias where id=?", [id]);
      
      if (result.affectedRows === 0) {
        throw new Error("Categoría no encontrada.");
      }

      return;

    } catch (error) {
      throw new Error("Error al eliminar la categoría.");
    }
  }
}

export default Categoria;