import  Express  from "express"

const app = Express()

const hostname = 'localhost'
const port = 9111

app.get('/', (req, res) => {
  res.end('hello world')
})

app.listen(port, hostname, () => {
  console.log('tôi là bảnh')
})