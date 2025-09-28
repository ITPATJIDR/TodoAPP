import { Router } from 'express'
import Todo_controller from '../Controllers/Todo_controller'

const Todo_router = Router()

Todo_router.get('/', Todo_controller.getTodos)

Todo_router.post('/', Todo_controller.createTodo)

Todo_router.put('/:id', Todo_controller.updateTodo)

Todo_router.delete('/:id', Todo_controller.deleteTodo)

Todo_router.patch('/:id/toggle', Todo_controller.isDoneTodo)

export default Todo_router