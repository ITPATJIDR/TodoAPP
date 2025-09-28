import { Request, Response } from 'express'
import prisma from '../utils/prisma'

const Todo_controller = {
  getTodos: async (req: Request, res: Response) => {
	try{
		const todos = await prisma.todo.findMany()
		res.status(200).json(todos)
	}catch(error){
		res.status(500).json({ message: 'Internal server error', error: error })
	}
  },
  createTodo: async (req: Request, res: Response) => {
	try{
		const { title } = req.body
		const todo = await prisma.todo.create({ data: { title } })
		res.status(201).json(todo)
	}catch(error){
		res.status(500).json({ message: 'Internal server error', error: error })
	}
  },
  updateTodo: async (req: Request, res: Response) => {
	try{
		const { id } = req.params
		const { title } = req.body
		const todo = await prisma.todo.update({ where: { id }, data: { title } })
		res.status(200).json(todo)
	}catch(error){
		res.status(500).json({ message: 'Internal server error', error: error })
	}
  },
  deleteTodo: async (req: Request, res: Response) => {
	try{
		const { id } = req.params
		const todo = await prisma.todo.delete({ where: { id } })
		res.status(200).json(todo)
	}catch(error){
		res.status(500).json({ message: 'Internal server error', error: error })
	}
  },
  isDoneTodo: async (req: Request, res: Response) => {
	try{
		const { id } = req.params
		const { isDone } = req.body
		const todo = await prisma.todo.update({ where: { id }, data: { completed: isDone } })
		res.status(200).json(todo)
	}catch(error){
		res.status(500).json({ message: 'Internal server error', error: error })
	}
  }
}

export default Todo_controller