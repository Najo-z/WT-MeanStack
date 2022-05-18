const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const Task = require('../models/task.model');

const userSchema = Joi.object({
	fullname: Joi.string().required(),
	email: Joi.string().email(),
	mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
	password: Joi.string().required(),
	repeatPassword: Joi.string().required().valid(Joi.ref('password')),
});

const postSchema = Joi.object({
	title: Joi.string().required(),
	content: Joi.string().required(),
});

module.exports = {
	insert,
	getTasks,
	addTask,
};

async function insert(user) {
	user = await userSchema.validateAsync(user, { abortEarly: false });
	user.hashedPassword = bcrypt.hashSync(user.password, 10);
	delete user.password;
	return await new User(user).save();
}

async function addTask(task) {
	task = await postSchema.validateAsync(task, { abortEarly: false }).catch((err) => {
		console.log("Empty field. ", err);
		return "FAILED";
	});
	if (task != "FAILED")
		return await new Task(task).save();
}

async function getTasks() {
	var data = Task.find().then((tasks, err) => { return (tasks); });
	return data;
}