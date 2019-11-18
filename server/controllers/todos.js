const Todo = require("../models").Todo;
const TodoItem = require("../models").TodoItem;

module.exports = {
	create(req, res) {
		return Todo.create({
			title: req.body.title
		})
			.then(todo => res.status(201).send(todo))
			.catch(error => res.status(400).send(error));
	},
	list(req, res) {
		/* .All => 2019 : .findAll */
		return Todo.findAll({
			include: [
				{
					model: TodoItem,
					as: "todoItems"
				}
			]
		})
			.then(todos => res.status(200).send(todos))
			.catch(error => res.status(400).send(error));
	},
	retrieve(req, res) {
		/* findById => 2019 : findByPk */
		return Todo.findByPk(req.params.todoId, {
			include: [
				{
					model: TodoItem,
					as: "todoItems"
				}
			]
		})
			.then(todo => {
				if (!todo) {
					return res.status(404).send({
						message: "Todo Not Found"
					});
				}
				return res.status(200).send(todo);
			})
			.catch(error => res.status(400).send(error));
	}
};
