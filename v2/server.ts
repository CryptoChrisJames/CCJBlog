const express = require('express');
const cors = require('cors');
import { Request, Response } from 'express';

const app = express();
app.use(cors('*'));

app.get('/', (req: Request, res: Response) => {
    res.send("WHAT'S UP, BITCHES???");
})

app.listen(process.env.PORT || 7777, () => {
    console.log('we runnin');
})