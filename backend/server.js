const express = require('express');
const mongoose = require('mongoose');
const port = 5000;
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');

require('dotenv').config();

mongoose
	.connect(
		'mongodb+srv://admin:' +
			process.env.MONGODB_PASSWORD +
			'@cluster0.4yrwu.mongodb.net/db-name?retryWrites=true&w=majority',
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => {
		const app = express();
		app.use(cors());

		const jwtCheck = jwt({
			secret: jwks.expressJwtSecret({
				cache: true,
				rateLimit: true,
				jwksRequestsPerMinute: 5,
				jwksUri:
					'https://outplacement.us.auth0.com/.well-known/jwks.json',
			}),
			audience: 'outplacementexpress',
			issuer: 'https://outplacement.us.auth0.com/',
			algorithms: ['RS256'],
		}).unless({ path: ['/'] });

		app.use(jwtCheck);

		app.get('/', (req, res) => {
			res.send('unprotected');
		});

		app.get('/protected', (req, res) => {
			res.send({ hello: 'Hello World!' });
		});

		app.listen(port, () => {
			console.log(`Example app listening at http://localhost:${port}`);
		});
	});
