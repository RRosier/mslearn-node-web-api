const express = require('express');
const app = express();
const port = 3000;

function isAuthorized(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== 'secretpassword') {
        return res.status(401).send('Unauthorized: Access Denied');
    }

    next();
}

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/users', isAuthorized, (req, res) => {
    res.json([
        {
            id: 1,
            name: 'User Userson'
        }
    ]);
});

app.get('/products', (req, res) => {
    const products = [
        { id: 1, name: 'hamer' },
        { id: 2, name: 'screwdriver' },
        { id: 3, name: 'wrench' }
    ];

    res.json(products);
});

app.post('/products', (req, res) => {
    let product = req.body;

    res.json(product);
});

app.listen(port, () => console.log(`Example app listening on port ${port}! http://localhost:${port}/`));