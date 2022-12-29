const express = require("express");
const cors = require("cors");
const port = process.env.port || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("programming hero job task");
});

//user name: face-media
//password: PEZPHxUlvy5fDhlK

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6x8xxck.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

console.log(uri);

async function run() {
  try {
    const Posts = client.db("face-media").collection("posts");

    app.post("/posts", async (req, res) => {
      const post = req.body;
      const result = await Posts.insertOne(post);
      res.send(result);
    });

    app.get('/posts', async(req, res) => {
        const query = {};
        const posts = await Posts.find(query).toArray()
        res.send(posts)
    })
  } finally {
  }
}
run().catch((error) => console.error(error));

app.listen(port, () => {
  console.log(`server is open on port ${port}`);
});
