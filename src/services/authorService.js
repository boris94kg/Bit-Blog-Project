import Author from '../entities/Author.js';
import axios from 'axios';

const fetchAuthors = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    const authors = response.data;
    return authors.map(author => new Author(author))
}

const fetchAuthor = async authorId => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${authorId}`);
    const singleAuthor = response.data;
    return new Author(singleAuthor);
}

export { fetchAuthors, fetchAuthor };