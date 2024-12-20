import Todo from "../models/todo.model.js";

const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user: req.user._id,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json({
      message: "Todo Created Successflly",
      newTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error creating todo" });
  }
};

const getTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find({ user: req.user._id });
    res.status(200).json({ message: "Todos fetched successfully", allTodos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error getting todo" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error updating todo" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(201).json({ message: "Todo Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error deleting todo" });
  }
};

export { createTodo, getTodos, updateTodo, deleteTodo };
