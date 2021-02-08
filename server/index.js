const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.static('public'));
app.use('/dist', express.static('dist'));
app.use('/public/images', express.static('public/images'));

app.get('/*', function (req, res) {
    
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));