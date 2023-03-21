const { urlencoded, response } = require('express');
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000

let db;
let dbConnectionStr = 'mongodb+srv://favartists:katebush@favartists.ywtugoc.mongodb.net/?retryWrites=true&w=majority'
let dbName = 'favartists'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
  .then(client => {
    console.log(`Connecting to ${dbName} DataBase`);
    db = client.db(dbName)
  })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  db.collection('favartists').find().toArray()
  .then(data => {
    res.render('index.ejs', { artists: data })
  })
  .catch(err => console.error(err)) 
})

app.post('/addArtist', (req, res) => {
  db.collection('favartists').insertOne(req.body)
  .then(result => {
    console.log('Artist Added')
    res.redirect('/')
  })
  .catch(err => console.error(err))
})

app.delete('/deleteArtist', (req, res) => {
  db.collection('favartists').deleteOne({artistName: req.body.artistName})
  .then(result => {
    console.log('Artist Deleted');
    res.json('Artist Deleted')
  })
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`Running the server on port: ${PORT}`);
})