const express = require('express');
const router = express.Router();

// require the controllers 
const todo_controller = require('../controllers/ToDo.controller');

router.get('/test', todo_controller.test);
router.get('/', todo_controller.todo_list);
router.get('/:id', todo_controller.todo_details);
router.post('/', todo_controller.todo_create);
router.put('/:id', todo_controller.todo_update);
router.delete('/:id', todo_controller.todo_delete);

module.exports = router;


