import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const {MONGODB_URI, MONGODB_DB} = process.env

if(!MONGODB_URI){
  throw new Error(
    'Please enter mongodb uri'
  )
}
if(!MONGODB_DB){
  throw new Error(
    'Please enter mongodb uri'
  )
}

let cached = global.mongo
if (!cached) cached = global.mongo ={}

export async function ConnectToDatabase(){
  if(cached.conn) return cached.conn
  if(!cached.promise){
    const conn ={}
    const opts ={
      useNewUrlParser: true,
      useUnifiedTopology:true
    }
  cached.promise = MongoClient.connect(MONGODB_URI,opts)
  .then((client)=>{
    conn.client = client
    return client.db(MONGODB_DB)
  })
  .then((db) => { 
    conn.db =db
    cached.conn =conn
  })
  }
  await cached.promise
  return cached.conn
}