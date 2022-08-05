require('dotenv').config();
const express = require('express');
const router = express.Router();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://"+process.env.MONGODB_USERNAME+":"+process.env.MONGODB_PASSWORD+"@"+process.env.MONGODB_HOST+"/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


router.get('/', (req, res) => {
    const database = client.db("homework");
      const collection = database.collection("pokestops");
      const result = collection.find();
      
    res.json(result);
    
 });

 router.get('/:id', (req, res) => {
      const database = client.db("homework");
      const collection = database.collection("pokestops");
      
    const query = { "_id":new ObjectId(req.params.id)};
    
      const result = collection.findOne(query);
      
    res.json(result);
           
   });

   router.post('/', (req, res) => {
      const database = client.db("homework");
      const collection = database.collection("pokestops");
      
      collection.insertOne(req.body);
      
      res.send('Adios pokestop');
    
  });

  router.delete('/:id', (req, res) => {
      const database = client.db("homework");
      const collection = database.collection("pokestops");
      
    const query = { "_id":new ObjectId(req.params.id)};
    
      collection.deleteOne(query);
        
      res.send("Adios!");
    
});

router.patch('/:id', (req, res) => {
    res.send(req.params.id);
});

module.exports = router;