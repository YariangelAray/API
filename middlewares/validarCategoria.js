export const validarCategoria = (req, res) => {  

  const { nombre, descripcion } = req.body;

  if (nombre.trim() === "" || !nombre) {
    return res.status(400).json({ mensaje: "El nombre en la categoría es obligatorio" });
  }
  if (descripcion.trim() === "" || !descripcion) {
    return res.status(400).json({ mensaje: "La descripción en la categoría es obligatorio" });
  }
}