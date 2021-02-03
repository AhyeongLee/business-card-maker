const express = require('express');
const app = express();
const port = 8080;

// app.get('/', (req, res) => res.send('Hello World!'));
app.use(express.static('public'));
app.use('/dist', express.static('dist'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));