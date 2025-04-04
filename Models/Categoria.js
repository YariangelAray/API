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
      
      const [rows] = await connection.query("SELECT * FROM categorias");  
      return rows;

    } catch (error) {
      //Lanzamos un error perzonalido
      throw new Error("Error al obtener las categorías.");
    }
  }

  // Método para crear una categoría
  async create(nombre, descripcion) {
    try {      

      const [result] = await connection.query("INSERT INTO categorias (nombre, descripcion) VALUES ( ?, ?)", [nombre, descripcion]);  
      
      return {
        nombre,
        descripcion
      };

    } catch (error) {
      throw new Error("Error al crear la categoría.");
    }
  }

  // Metodo para actualizar una categoría
  async update(id, nombre, descripcion) {
    try {
      
      const [result] = await connection.query("UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?", [nombre, descripcion, id]);

      // Si no se actualizó ningún registro, lanzamos un error
      if (result.affectedRows === 0) {
        throw new Error("Categoría no encontrada.");
      }

      return {
        id,
        nombre,
        descripcion
      };

    } catch (error) {
      throw new Error( error.message || "Error al actualizar la categoría.");
    }
  }

  // Método para actualizar parcialmente una categoría
  async updatePatch(id, propiedades) {
    try {

      let sentencia = "";
      // Recorremos las propiedades y creamos la sentencia SQL
      for (const key in propiedades) {        
        sentencia += `${key} = "${propiedades[key]}", `;
      }            
      // Eliminamos la última coma y espacio 
      sentencia = sentencia.slice(0, -2);   
      
      const [result] = await connection.query(`UPDATE categorias SET ${sentencia} WHERE id = ?`, [id]);

      // Si no se actualizó ningún registro, lanzamos un error
      if (result.affectedRows === 0) {
        throw new Error("Categoría no encontrada.");
      }

    } catch (error) {
      throw new Error (error.message || "Error al actualizar la categoría.");
    
    }
  }

  // Método para verificar si la categoría tiene productos relacionados
  async relacionConProductos(categoriaId) {    
      const [productos] = await connection.query("SELECT * FROM productos WHERE categoria_id = ?", [categoriaId]);      
      
      return productos.length > 0;
      
  }

  // Método para eliminar una categoría
  async delete(id) {
    try {

      // Verificamos si la categoría tiene productos relacionados
      const relacion = await this.relacionConProductos(id);

      // Si tiene el resultado es true, lanzamos un error
      if (relacion){
        throw new Error("No se puede eliminar la categoría porque tiene productos relacionados.");
      }
      
      const [result] = await connection.query("DELETE FROM categorias where id=?", [id]);      
      
      // Si no se eliminó ningún registro, lanzamos un error
      if (result.affectedRows === 0) {
        throw new Error("Categoría no encontrada.");
      }

      return;

    } catch (error) {    
      throw new Error(error.message || "Error al eliminar la categoría.");
    }
  }
}

export default Categoria;