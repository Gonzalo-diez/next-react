import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import 'dotenv/config.js';

const app = express();
const {MONGODB_URI, SECRET_KEY, RESAVE, SAVE} = process.env;


// Conexión a la base de datos MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("Error de conexión a MongoDB:", err);
});

db.once("open", () => {
    console.log("Conexión a MongoDB exitosa");
});

// Define el modelo de usuario en Mongoose
const userSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo_electronico: String,
    contrasena: String,
});

const User = mongoose.model("User", userSchema);

// Define el modelo de productos en Mongoose
const productosSchema = new mongoose.Schema({
    nombre: String,
    marca: String,
    categoria: String,
    precio: Number,
    stock: Number,
    descripcion: String,
    imagen_url: String,
});

const Productos = mongoose.model("Productos", productosSchema);


// Configuración de Passport para autenticación local
passport.use(
    new LocalStrategy(
        {
            usernameField: "correo_electronico",
            passwordField: "contrasena",
        },
        async (correo_electronico, contrasena, done) => {
            try {
                const user = await User.findOne({ correo_electronico }).exec();

                if (!user || user.contrasena !== contrasena) {
                    return done(null, false, { message: "Credenciales inválidas" });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

app.use(express.json());
app.use(cors());
app.use(
    session({
        secret: SECRET_KEY,
        resave: RESAVE,
        saveUninitialized: SAVE,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", async (req, res) => {
    try {
        const productos = await Productos.find({});
        return res.json(productos);
    } catch (err) {
        return res.status(500).json({ error: "Error en la base de datos", details: err.message });
    }
});

// Método para buscar producto segun su categoria en mongodb
app.get("/productos/:categoria", async (req, res) => {
    const categoria = req.params.categoria;

    try {
        // Utiliza el método find de Mongoose para buscar productos por categoria
        const productos = await Productos.find({ categoria }).exec();
        return res.json(productos);
    } catch (err) {
        return res.status(500).json({ error: "Error en la base de datos", details: err.message });
    }
});

// Método para buscar productos segun su _id en mongodb
app.get("/productos/detalle/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const productoId = new mongoose.Types.ObjectId(id);

        const productos = await Productos.findOne({ _id: productoId }).exec();

        if (!productos) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        return res.json(productos);
    } catch (err) {
        return res.status(500).json({ error: "Error en la base de datos", details: err.message });
    }
});

// Método para obtener los productos creados por el usuario autenticado (dashboard)
app.get("/dashboard", (req, res) => {
    if (req.isAuthenticated()) {
        const usuarioActual = req.user; 

        Productos.find({ _id: usuarioActual._id })
            .exec()
            .then((productos) => {
                return res.json(productos);
            })
            .catch((err) => {
                return res.status(500).json({ error: "Error en la base de datos", details: err.message });
            });
    } else {
        return res.status(401).json({ error: "No has iniciado sesión" });
    }
});

// Método para agregar productos
app.post("/agregarProductos", async (req, res) => {
    const {
        nombre,
        marca,
        categoria,
        precio,
        stock,
        descripcion,
        imagen_url,
    } = req.body;

    try {
        const nuevoProducto = new Productos({
            nombre,
            marca,
            categoria,
            precio,
            stock,
            descripcion,
            imagen_url,
        });

        await nuevoProducto.save();

        return res.json("Producto creado!!!");
    } catch (err) {
        console.error("Error al guardar el blog:", err);
        return res
            .status(500)
            .json({ error: "Error en la base de datos", details: err.message });
    }
});

// Método de registro
app.post("/registro", async (req, res, next) => {
    const { nombre, apellido, correo_electronico, contrasena } = req.body;

    try {
        const newUser = new User({
            nombre,
            apellido,
            correo_electronico,
            contrasena,
        });

        await newUser.save();

        passport.authenticate("local")(req, res, () => {
            return res.json({ message: "Usuario registrado!" });
        });
    } catch (err) {
        return next(err);
    }
});

// Método para realizar login
app.post("/login", (req, res, next) => {
    const { correo_electronico, contrasena } = req.body;

    if (!correo_electronico || !contrasena) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            return res.json({ message: "Inicio de sesión exitoso", usuario: user });
        });
    })(req, res, next);
});

app.post("/logout", (req, res) => {
    req.logout();
    res.json({ message: "Cierre de sesión exitoso" });
});


// Método para actualizar un producto
app.put("/productos/actualizarProducto/:id", async (req, res) => {
    const productoId = req.params.id;
    const { nombre, marca, categoria, precio, stock, descripcion, imagen_url } = req.body;

    try {
        const updatedProducto = await Productos.findByIdAndUpdate(
            productoId,
            {
                nombre,
                marca,
                categoria,
                precio,
                stock,
                descripcion,
                imagen_url,
            },
            { new: true }
        );

        if (!updatedProducto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        return res.json("Producto actualizado!");
    } catch (err) {
        console.error("Error en la actualización:", err);
        return res.status(500).json({ error: "Error en la base de datos", details: err.message });
    }
});

// Método para borrar un producto
app.delete("/productos/borrarProducto/:id", async (req, res) => {
    const productoId = req.params.id;

    try {
        const result = await Productos.deleteOne({ _id: productoId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        return res.json("Producto eliminado!");
    } catch (err) {
        return res.status(500).json({ error: "Error en la base de datos", details: err.message });
    }
});

app.listen(8800, () => {
    console.log("Backend conectado");
});