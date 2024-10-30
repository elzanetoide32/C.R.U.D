import express from 'express';
import mongoose from 'mongoose';

const app = express();
const puerto = 3001;

// Middleware
app.use(express.json()); // Para parsear el cuerpo de las peticiones en formato JSON

// Conectar a MongoDB
// Usa la variable de entorno para la URI de conexión
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión:', err));

// Iniciar el servidor
app.listen(puerto, () => {
    console.log(`Servidor en funcionamiento en el puerto ${puerto}`);
});

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String }
});

const Producto = mongoose.model('Producto', productoSchema);

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    edad: { type: Number },
    correo: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Crear un nuevo producto
app.post('/productos', async (req, res) => {
    const nuevoProducto = new Producto(req.body);
    try {
        const productoGuardado = await nuevoProducto.save();
        res.status(201).send(productoGuardado);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Obtener todos los productos
app.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.send(productos);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Actualizar un producto por ID
app.put('/productos/:id', async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(productoActualizado);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Eliminar un producto por ID
app.delete('/productos/:id', async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.send('Producto eliminado');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
    const nuevoUsuario = new Usuario(req.body);
    try {
        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).send(usuarioGuardado);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Actualizar un usuario por ID
app.put('/usuarios/:id', async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(usuarioActualizado);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Eliminar un usuario por ID
app.delete('/usuarios/:id', async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.send('Usuario eliminado');
    } catch (err) {
        res.status(500).send(err);
    }
});
