const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://skyxxx9339:${process.env.PASSWORD}@juflearn.xzhyycz.mongodb.net/?retryWrites=true&w=majority`;

export const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    await client.db("juflearn").command({ ping: 1 });
    console.log("Connected successfully to DB");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
