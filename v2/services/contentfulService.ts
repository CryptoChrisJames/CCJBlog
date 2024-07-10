import axios from 'axios';
import { type BlogListItem } from '../types/blogListItem.ts';
import { type Blog } from '../types/blog.ts';

const spaceId = process.env.CONTENTFUL_SPACE;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;


const getBlogList = async () => {
    const response = await axios.get(
        `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&select=sys.id,fields.title,fields.date,fields.description,fields.category&content_type=article`);
    const blogList = response.data.items.map((item: any) => {
        return {
            id: item.sys.id,
            title: item.fields.title,
            date: item.fields.date,
            description: item.fields.description,
            category: item.fields.category,
        } as BlogListItem;
    });
    return blogList;
};

const getBlogById = async (id: string) => {
    const response = await axios.get(
        `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries/${id}?access_token=${accessToken}`);
    const blogData = response.data;
    const blog = {
        id: blogData.sys.id,
        title: blogData.fields.title,
        date: blogData.fields.date,
        description: blogData.fields.description,
        category: blogData.fields.category,
        article: blogData.fields.article,
    } as Blog;
    return blog;
};

export {
    getBlogList,
    getBlogById
};