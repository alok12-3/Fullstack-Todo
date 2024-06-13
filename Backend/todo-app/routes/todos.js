const express = require('express');
const auth = require('../middleware/auth');
const Todo = require('../models/Todo');

const router = express.Router();

// Get all todos for the authenticated user
router.get('/', auth, async (req, res) => {
   try {
      const todos = await Todo.find({ userId: req.user.id });
      res.json(todos);
   } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
   }
});

// Add a new todo
router.post('/', auth, async (req, res) => {
   const { text } = req.body;
   try {
      const newTodo = new Todo({
         userId: req.user.id,
         text,
      });
      const todo = await newTodo.save();
      res.json(todo);
   } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
   }
});

// Update a todo
router.put('/:id', auth, async (req, res) => {
   const { text, completed } = req.body;

   try {
      let todo = await Todo.findById(req.params.id);
      if (!todo) return res.status(404).json({ msg: 'Todo not found' });

      if (todo.userId.toString() !== req.user.id) {
         return res.status(401).json({ msg: 'User not authorized' });
      }

      todo = await Todo.findByIdAndUpdate(req.params.id, { text, completed }, { new: true });
      res.json(todo);
   } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
   }
});

// Delete a todo
router.delete('/:id', auth, async (req, res) => {
   try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) return res.status(404).json({ msg: 'Todo not found' });

      if (todo.userId.toString() !== req.user.id) {
         return res.status(401).json({ msg: 'User not authorized' });
      }

      await todo.remove();
      res.json({ msg: 'Todo removed' });
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});

module.exports = router;
