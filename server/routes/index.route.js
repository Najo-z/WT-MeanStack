const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const userCtrl = require('../controllers/user.controller');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

// router.get('/tasks', (req, res) => {
// 	userCtrl.get().then((user, err) => {
// 		if (err) {
// 			console.log(err);
// 			res.send('KO');
// 		}
// 		console.log("/tasks : ", user);
// 	});
// 	res.send("MDR");
// });

router.post('/addTask', (req, res) => {
	userCtrl.addTask(req.body).then((user, err) => {
		if (err) {
			console.log("Error occured: ", err);
			res.status(500).send({ error: "Something failed! " + err });
		}
		console.log("MYPOST /addTask: ", user)
	});
})

router.post('/editTask', (req, res) => {
	userCtrl.editTask(req.body).then((user, err) => {
		if (err) {
			console.log("Error occured: ", err);
			res.status(500).send({ error: "Something failed! " + err });
		}
		console.log("MYPOST /editTask: ", user)
	});
})

router.post('/getTasks', (req, res) => {
	userCtrl.getTasks().then((tasks, err) => {
		if (err) {
			console.log("Error occured: ", err);
			res.status(500).send({ error: "Something failed! " + err });
		}
		console.log("MYPOST /getTasks: ", tasks)
		res.json({ taskList: tasks });
	});
})



module.exports = router;
