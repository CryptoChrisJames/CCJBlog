import axios from 'axios';
import { type BlogListItem } from '../types/blogListItem.ts';
import { type Blog } from '../types/blog.ts';
const highlight = require('highlight.js');
const marked = require('marked');

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code: any, lang: any) {
        // Check if the specified language is valid for highlight.js
        const validLanguage = highlight.getLanguage(lang) ? lang : 'plaintext';
        return highlight.highlight(validLanguage, code).value;
    },
    langPrefix: 'language-', // CSS class prefix
    pedantic: false,
    gfm: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

const spaceId = process.env.CONTENTFUL_SPACE;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const convertMarkdownToHtml = (markdown: string) => {
    return marked.parse(markdown);
};

const getBlogList = async () => {
    const response = await axios.get(
        `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&select=sys.id,fields.title,fields.date,fields.description,fields.category&content_type=article`
    );
    const blogList: BlogListItem[] = 
        response.data.items.map((item: any) => {
;            return {
                id: item.sys.id,
                title: item.fields.title,
                date: item.fields.date,
                description: item.fields.description,
                category: item.fields.category
            } as BlogListItem;
    });
    blogList.sort((a, b) => new Date(b.date) - new Date(a.date));
    return blogList;
};

const getBlogById = async (id: string) => {
    const response = await axios.get(
        `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries/${id}?access_token=${accessToken}`);
    const blogData = response.data;
    const article = blogData.fields.article;
    const articleHtml = convertMarkdownToHtml(article);
    const blog = {
        id: blogData.sys.id,
        title: blogData.fields.title,
        date: blogData.fields.date,
        description: blogData.fields.description,
        category: blogData.fields.category,
        imageUrl: blogData.fields.seoImage,
        keywords: blogData.fields.keywords,
        article: articleHtml,
    } as Blog;
    return blog;
};

const getFilteredBlogList = async (filter: string) => {
    if (filter === 'all') {
        return await getBlogList();
    }
    if (!['ent', 'life', 'tech'].includes(filter)) return [];
    const list: BlogListItem[] = await getBlogList();
    const filteredList = list.filter((item) => item.category === filter);
    return filteredList;
}

export {
    getBlogList,
    getBlogById,
    getFilteredBlogList,
};