const cors = require('cors');
const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.swoyo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db('todo-app');
    const notesCollection = database.collection('notes');

    // GET NOTES

    app.get('/notes', async (req, res) => {
      const notes = notesCollection.find({});
      const result = await notes.toArray();
      res.send(result)
    });

    // ADD DATA TO CART

    app.post('/notes', async (req, res) => {
      const notes = req.body;
      const result = await notesCollection.insertOne(notes);
      res.json(result);
    })
  }
  finally {
    // await client.close()
  }

}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Todo App Server Is Working Perfectly!')
})

app.listen(port, () => {
  console.log(`App listening at port: ${port}`)
})