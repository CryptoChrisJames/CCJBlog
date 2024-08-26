const express = require('express');
const cors = require('cors');
const { engine } = require('express-handlebars');
import { Request, Response } from 'express';
import { getBlogList, getBlogById } from './services/contentfulService.ts';
import type { Blog } from './types/blog.ts';
import type { BlogListItem } from './types/blogListItem.ts';

const app = express();
app.use(cors('*'));
app.use(express.static('public'));

app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: './views/layouts',
    partialsDir: './views/partials',
    helpers: {
        dateFormat: (date: string) => {
            return new Date(date).toLocaleDateString('en-US');
        }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', './views/templates');

app.get('/', async (req: Request, res: Response) => {
    const blogList:BlogListItem[] = await getBlogList();
    res.render('home', { blogs: blogList });
});

app.get('/article/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const blog:Blog = await getBlogById(id);
    res.render('article', { ...blog });
});

app.listen(process.env.PORT || 7777, () => {
    console.log(`we runnin in ${process.env.CURRENT_ENV}`);
});