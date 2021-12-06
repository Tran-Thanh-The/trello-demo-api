import { MongoClient } from 'mongodb'
import { env } from '*/config/environment' 

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  try {
    // connect
    await client.connect()
    console.log('connect successfully!')
    
    await listDatabase(client)
  } finally {
    // the client will close when finish or error
    await client.close()
  }
}

const listDatabase = async (client) => {
  const databasesList = await client.db().admin().listDatabases()
  console.log(databasesList)
  console.log('your database')
  databasesList.databases.forEach(element => {
    console.log(`-${element.name}`)
  });
} 