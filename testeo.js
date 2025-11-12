import express from 'express';

const app = express();

app.use(express.json());


app.use((req, res, next) => {
  console.log(`Middleware => ${req.method} ${req.url}`);
  next();
});


// Datos de ejemplo (simulando una base de datos)
const users = [
    {name: 'Ana', id: 1, edad: 23 },
    {name: 'Luis', id: 2, edad: 54},
    {name: 'Carla', id: 3, edad: 22},
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

app.get('/users/:name', (req,res) =>{
  const name = req.params.name.toLowerCase();
  const user = users.find(user => user.name.toLowerCase() === name);

  if (user) {
    res.json(user);
    
  }else{
    res.status(404).json({message: 'usuario no encontrado'})
  }
})

///app.post('/personaje', (req,res) => {
  ///const newPlayer = req.body;
  ///console.log("Creando personaje...")

  ///res.status(200).json(newPlayer)


///})





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
});
