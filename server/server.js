const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const serverPort = process.env.PORT || 3000;

const app = express();
app.use(express.static(publicPath));
app.listen(serverPort, () => {
    console.log(`Server is up on port ${serverPort}`);
});

