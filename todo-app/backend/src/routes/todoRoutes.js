import express from 'express';
import * as todoController from '../controllers/todoController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { createTodoSchema, updateTodoSchema, bulkOperationSchema } from '../validators/todoValidator.js';

const router = express.Router();

router.use(authenticate);

router.get('/', todoController.getTodos);
router.get('/trash', todoController.getTrash);
router.get('/:id', todoController.getTodo);
router.post('/', validate(createTodoSchema), todoController.createTodo);
router.put('/:id', validate(updateTodoSchema), todoController.updateTodo);
router.patch('/:id/status', todoController.updateTodoStatus);
router.delete('/:id', todoController.deleteTodo);
router.post('/:id/restore', todoController.restoreTodo);
router.delete('/:id/permanent', todoController.permanentlyDeleteTodo);
router.post('/bulk', validate(bulkOperationSchema), todoController.bulkOperation);

export default router;
