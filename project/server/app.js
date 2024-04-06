import express from "express";
const app = express();
const path = require('path');

app.use(express.static(path.join(server , 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT , () => {
    console.log(`Server listening on ${PORT}`);
});