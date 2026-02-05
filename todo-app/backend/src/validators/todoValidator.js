import Joi from 'joi';

export const createTodoSchema = Joi.object({
  title: Joi.string().max(200).required().messages({
    'string.max': 'Title must not exceed 200 characters',
    'any.required': 'Title is required',
  }),
  description: Joi.string().max(2000).optional().allow(''),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent').default('medium'),
  status: Joi.string().valid('to_do', 'in_progress', 'completed').default('to_do'),
  dueDate: Joi.date().optional().allow(null),
  categoryId: Joi.string().uuid().optional().allow(null),
});

export const updateTodoSchema = Joi.object({
  title: Joi.string().max(200).optional(),
  description: Joi.string().max(2000).optional().allow(''),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent').optional(),
  status: Joi.string().valid('to_do', 'in_progress', 'completed').optional(),
  dueDate: Joi.date().optional().allow(null),
  categoryId: Joi.string().uuid().optional().allow(null),
});

export const bulkOperationSchema = Joi.object({
  todoIds: Joi.array().items(Joi.string().uuid()).required(),
  operation: Joi.string().valid('delete', 'complete', 'uncomplete', 'setPriority', 'setCategory').required(),
  value: Joi.alternatives().conditional('operation', {
    is: 'setPriority',
    then: Joi.string().valid('low', 'medium', 'high', 'urgent').required(),
    otherwise: Joi.alternatives().conditional('operation', {
      is: 'setCategory',
      then: Joi.string().uuid().required(),
      otherwise: Joi.forbidden(),
    }),
  }),
});
