import express from 'express';

const app = express();

app.use(express.json());


app.use((req, res, next) => {
  console.log(`Middleware => ${req.method} ${req.url}`);
  next();
});


// Datos de ejemplo (simulando una base de datos)
const users = [
    {name: 'ana', id: 1 },
    {name: 'Luis', id: 2,},
    {name: 'Carla', id: 3},
  ];

// 5️⃣ Ruta raíz "/"
// app.get() crea una ruta que responde a solicitudes GET.
app.get('/', (req, res) => {
  res.send('Welcome to Express.js!');
});

// 6️⃣ Ruta GET /users
// Devolvemos un JSON de usuarios (como haría una API real)
app.get('/users', (req, res) => {
  res.json(users); // Express convierte automáticamente el objeto a JSON
});

//ruta users

app.post('/users', (req, res) => {
  const newUser = req.body; // Express ya parseó el JSON del body.
  console.log('Nuevo usuario recibido:', newUser);

  newUser.id = Math.floor(Math.random() * 1000);

  users.push(newUser)

  res.status(201).json(newUser);

});

///app.post('/personaje', (req,res) => {
  ///const newPlayer = req.body;
  ///console.log("Creando personaje...")

  ///res.status(200).json(newPlayer)


///})





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
});
