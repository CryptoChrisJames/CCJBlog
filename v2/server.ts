const express = require('express');
const cors = require('cors');
import { Request, Response } from 'express';
import { getBlogList, getBlogById } from './services/contentfulService.ts';

const app = express();
app.use(cors('*'));

app.get('/', async (req: Request, res: Response) => {
    const blogList = await getBlogList();
    res.send(blogList);
});

app.get('/article/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const blog = await getBlogById(id);
    res.send(blog);
});

app.listen(process.env.PORT || 7777, () => {
    console.log('we runnin');
});