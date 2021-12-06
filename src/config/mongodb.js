import { MongoClient } from 'mongodb'
import { env } from '*/config/environment' 

let dbInstance = null

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  // connect
  await client.connect()

  // Assign clientDB to dbInstance
  dbInstance = client.db(env.DATABASE_NAME)
}

// get Database Instance
export const getDB = () => {
  if (!dbInstance) throw new Error('Must connect Database first!')
  return dbInstance
}


//  draft
// const listDatabase = async (client) => {
//   const databasesList = await client.db().admin().listDatabases()
//   console.log(databasesList)
//   console.log('your database')
//   databasesList.databases.forEach(element => {
//     console.log(`-${element.name}`)
//   });
// } 