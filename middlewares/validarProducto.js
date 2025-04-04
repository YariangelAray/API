export const validarProducto = (req, res, next) => {
    const { nombre, descripcion, precio, categoria_id } = req.body;

    if (nombre.trim() === "" || !nombre) {
        return res.status(400).json({ mensaje: "El nombre en el producto es obligatorio" });
    }
    if (descripcion.trim() === "" || !descripcion) {
        return res.status(400).json({ mensaje: "La descripción en el producto es obligatorio" });
    }
    if (precio.trim() === "" || !precio) {
        return res.status(400).json({ mensaje: "El precio en el producto es obligatorio" });
    }
    if (categoria_id.trim() === "" || !categoria_id) {
        return res.status(400).json({ mensaje: "La categoría en el producto es obligatoria" });
    }

    next();
}