const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { engine } = require('express-handlebars');
import { Request, Response } from 'express';
import { getBlogList, getBlogById, getFilteredBlogList } from './services/contentfulService.ts';
import type { Blog } from './types/blog.ts';
import type { BlogListItem } from './types/blogListItem.ts';

const app = express();
app.use(cors('*'));
app.use(express.static('public'));

app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    helpers: {
        dateFormat: (date: string) => {
            return new Date(date).toLocaleDateString('en-US');
        }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', [
    path.join(__dirname, 'views', 'templates'),
    path.join(__dirname, 'views')
]);

app.get('/', async (req: Request, res: Response) => {
    const blogList:BlogListItem[] = await getBlogList();
    blogList.map((item) => { item.category = item.category.toUpperCase() });
    res.render('home', { blogs: blogList });
});

app.get('/article/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const blog:Blog = await getBlogById(id);
    res.render('article', { ...blog });
});

app.get('/article/filter/:filter', async (req: Request, res: Response) => {
    const filter = req.params.filter;
    const blogList:BlogListItem[] = await getFilteredBlogList(filter);
    blogList.map((item) => { item.category = item.category.toUpperCase() });
    
    res.render('filteredBlogList', { 
        layout: false, 
        blogs: blogList 
    });
});

app.listen(process.env.PORT || 7777, () => {
    console.log(`we runnin in ${process.env.CURRENT_ENV}`);
});