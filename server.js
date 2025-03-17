const express = require('express');
const { Sequelize } = require('sequelize'); // Agregada esta línea
const sequelize = require('./database'); 
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
 // Para variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Soporte para JSON
app.use(cors()); // Permitir acceso desde otros dominios

// Modelo de productos (ejemplo)
const Producto = sequelize.define('producto', {
    nombre: { type: Sequelize.STRING, allowNull: false },
    precio: { type: Sequelize.FLOAT, allowNull: false },
    descripcion: { type: Sequelize.STRING }
});

// Ruta para obtener productos
app.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// Ruta para agregar productos al carrito (ejemplo simple)
app.post('/carrito', (req, res) => {
    const { productoId, cantidad } = req.body;
    // Lógica para agregar al carrito (guardar en DB o en sesión)
    res.json({ mensaje: `Producto ${productoId} agregado al carrito` });
});

// Ruta para autenticación (registro e inicio de sesión)
const usuarios = []; // Simulación de base de datos de usuarios

app.post('/registro', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    usuarios.push({ username, password: hashedPassword });
    res.json({ mensaje: 'Usuario registrado' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = usuarios.find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Iniciar servidor
app.listen(PORT, async () => {
    try {
        await sequelize.sync();
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    } catch (error) {
        console.error('Error iniciando el servidor:', error);
    }
});
