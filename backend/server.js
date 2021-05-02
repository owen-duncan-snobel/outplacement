const express = require('express');
const port = 5000;
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const fetch = require('node-fetch');

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
	app.use(express.urlencoded());

	/**
	 * * Returns the users-profile data for site
	 */
	app.get('/dashboard', async (req, res) => {
		try {
			const collection = client.db('db-name').collection('users-data');
			const sub_token = req.user.sub.split('|')[1];
			const userData = await collection.findOne({ user: sub_token });
			res.send({ user_data: userData.user_data });
		} catch (error) {
			res.status(404);
			res.send({ error: "User doesn't exist!" });
		}
	});

	app.post('/dashboard', async (req, res) => {
		try {
			const collection = client.db('db-name').collection('users-data');
			const sub_token = req.user.sub.split('|')[1];
			const userData = await collection.updateOne(
				{ user: sub_token },
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

	app.post('/jobs', async (req, res) => {
		try {
			const data = req.body;
			const q = encodeURI(req.body.q);
			const l = encodeURI(req.body.l);

			fetch(
				`https://sleepy-hamlet-27892.herokuapp.com/jobs/?q=${q}&l=${l}`,
				{
					method: 'GET',
				}
			)
				.then((response) => response.json())
				.then((json) => res.send(json));
		} catch (error) {
			res.status(404);
			res.send({ error: 'Jobs could not be fetched' });
		}
	});

	app.get('/protected', (req, res) => {
		res.send({ hello: 'Hello World!' });
	});

	app.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`);
	});
});
