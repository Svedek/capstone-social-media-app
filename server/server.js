const express = require("express");

const app = express();
const database = import('./database.mjs')

const PORT = process.env.PORT || 8080;  // Used port assigned by provider OR 8080 if env.PORT cannot be found

app.listen(PORT, () => console.log("Server started"));

app.use(express.static("build"));

const items = [
  {
    name: "Laptop",
    price: 500,
  },
  {
    name: "Desktop",
    price: 700,
  },
];

app.get("/api/items", (req, res) => {
  res.send(items);
});



// Here and below is database example stuff
app.get('/person', async (req, res) => {
    (await database).getPersons().then(persons => {
        res.send(persons)
    })
})

app.get('/person/:id', async (req, res) => {
    const id = req.params.id;
    (await database).getPerson(id).then(person => {
        res.send(person)
    })
})

app.post('/person', async (req, res) => {
    const { name, bio } = req.body;
    (await database).createPerson(name, bio).then(person => {
        res.status(201).send(person)  // Status 201 = created
    })
})

app.get('/', (req, res) => {
    console.log('Here')
    res.render('index', { text: 'World' })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

