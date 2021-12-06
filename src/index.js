import  express  from "express"
import { connectDB } from "*/config/mongodb"
import { env } from "*/config/environment"
import { apiV1 } from '*/routes/V1'


connectDB()
  .then(() => console.log('Connected successfully!'))
  .then(() => bootServer())
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

const bootServer = () => {
  const app = express()

  // Enable req.body
  app.use(express.json())

  // use APIS
  app.use('/v1', apiV1)
  
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`toi la banh ${env.APP_HOST}:${env.APP_PORT}`)
  })
}