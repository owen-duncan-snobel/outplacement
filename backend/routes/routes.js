const express = require('express');
const router = express.Router();
const userDataSchema = require('../models/users_data');

router.get('/user-data', async (req, res) => {
	const userData = await userDataSchema.find();
});
module.exports = router;
