const express = require('express');
const port = 5000;
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');

require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const uri =
	'mongodb+srv://admin:' +
	process.env.MONGODB_PASSWORD +
	'@cluster0.4yrwu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

client.connect((err) => {
	const app = express();
	app.use(cors());

	const jwtCheck = jwt({
		secret: jwks.expressJwtSecret({
			cache: true,
			rateLimit: true,
			jwksRequestsPerMinute: 5,
			jwksUri: 'https://outplacement.us.auth0.com/.well-known/jwks.json',
		}),
		audience: 'outplacementexpress',
		issuer: 'https://outplacement.us.auth0.com/',
		algorithms: ['RS256'],
	}).unless({ path: ['/'] });

	app.use(jwtCheck);
	app.use(express.json());

	/**
	 * * Returns the users-profile data for site
	 */
	app.get('/dashboard', async (req, res) => {
		try {
			const collection = client.db('db-name').collection('users-data');
			const accessToken = req.headers.authorization.split(' ')[1];
			const verifyUser = await axios.get(
				'https://outplacement.us.auth0.com/userinfo',
				{
					headers: {
						authorization: `Bearer ${accessToken}`,
					},
				}
			);

			const userAuthInfo = verifyUser.data;
			const id = userAuthInfo.sub.split('|')[1];
			const userData = await collection.findOne({ user: id });

			res.send({ user_data: userData.user_data });
		} catch (error) {
			res.status(404);
			res.send({ error: "User doesn't exist!" });
		}
	});

	app.post('/dashboard', async (req, res) => {
		try {
			const collection = client.db('db-name').collection('users-data');
			const accessToken = req.headers.authorization.split(' ')[1];
			const verifyUser = await axios.get(
				'https://outplacement.us.auth0.com/userinfo',
				{
					headers: {
						authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const userAuthInfo = verifyUser.data;
			const id = userAuthInfo.sub.split('|')[1];
			const userData = await collection.updateOne(
				{ user: id },
				{
					$set: {
						user_data: req.body.user_data,
					},
				}
			);
			res.status(200);
			res.send();
		} catch (error) {
			res.status(404);
			res.send({ error: 'Could not be saved' });
		}
	});

	app.get('/protected', (req, res) => {
		res.send({ hello: 'Hello World!' });
	});

	app.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`);
	});
});
