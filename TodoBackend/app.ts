import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import Todo_router from './routers/Todo_router'

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port: number = 5000

app.use('/api/todos', Todo_router)

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Server is running'
  })
})

app.listen(port, () => console.log(`Application is running on port ${port}`))