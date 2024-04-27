import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 4000;

app.get('/test', (req, res) => {
    res.status(200).send("API is working");
});

app.get('/users', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
});

app.get('/users/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
});

app.post('/users', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
})

app.put('/users/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
})

app.delete('/users/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
})


////NOTES////
app.get('/notes', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
});

app.get('/notes/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
});

app.post('/notes', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
})

app.put('/notes/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
})

app.delete('/notes/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
})



////3rd Party API////







app.listen(port, () => {
    console.log('Running...');
})