import express from "express";
const router = express.Router();
const todosController = require("../server/controllers").todos;
const todoItemsController = require("../server/controllers").todoItems;

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Express" });
});

/* 2nd Page */
router.get("/api", (req, res) =>
	res.status(200).send({
		message: "Welcome to the Todos API!"
	})
);

router.get("/api/todos", todosController.list);
router.post("/api/todos", todosController.create);

router.get("/api/todos/:todoId", todosController.retrieve);
router.put("/api/todos/:todoId", todosController.update);
router.delete("/api/todos/:todoId", todosController.destroy);

router.post("/api/todos/:todoId/items", todoItemsController.create);
router.put("/api/todos/:todoId/items/:todoItemId", todoItemsController.update);
router.delete(
	"/api/todos/:todoId/items/:todoItemId",
	todoItemsController.destroy
);

router.all("/api/todos/:todoId/items", (req, res) =>
	res.status(405).send({
		message: "Method Not Allowed"
	})
);

module.exports = router;
