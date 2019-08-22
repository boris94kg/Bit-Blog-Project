import Author from '../entities/Author.js';
const axios = require('axios');


const fetchAuthors = () => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => res.data)
        .then(data => {
            return data.map(post => {
                return new Author(post);
            })
        })
}



const fetchAuthor = (authorId) => {
    return axios.get(`https://jsonplaceholder.typicode.com/users/${authorId}`)
        .then(res => res.data)
        .then(data => {
            return new Author(data);
        })
}


export { fetchAuthors, fetchAuthor }