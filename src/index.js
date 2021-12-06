import  Express  from "express"
import { connectDB  } from "*/config/mongodb"
import { env } from "*/config/environment"

import { mapOrder } from "*/utilities/sorts.js"

const app = Express()

connectDB().catch(console.log)

app.get('/', (req, res) => {
  res.end('hello world tôi là bảnh')
})

app.listen(env.PORT, env.HOST, () => {
  console.log(`tôi là bảnh ${env.HOST}:${env.PORT}`)
})