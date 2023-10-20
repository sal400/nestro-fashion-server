const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.rkpusfk.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    //Users code start from here:
    const database = client.db('nestro')
    const brands = database.collection('brands')
    const products = database.collection('products')
    
    //Read Brands
    app.get('/brands', async(req, res)=>{
        const result = await brands.find().toArray()
        res.send(result)
    })

    //Read Products
    app.get('/products', async(req, res)=>{
        const result = await products.find().toArray()
        res.send(result)
    })
    



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('Welcome to nestro-server')
})

app.listen(port, ()=>{
    console.log(`nestro-server is running on ${port}`)
})