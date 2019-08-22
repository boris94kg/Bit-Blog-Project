import Post from '../entities/Post';
const axios = require('axios');


const fetchPosts = () => {
    return axios.get('https://jsonplaceholder.typicode.com/posts?_limit=30')
        .then(res => res.data)
        .then(data => {
            return data.map(post => {
                return new Post(post);
            })
        })
}


const fetchPost = (postId) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(res => res.data)
        .then(data => {
            return new Post(data);
        })
}

const fetchRelatedPosts = (postId) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${postId}`)
        .then(response => response.data)
        .then(data => {
            return data.map(post => {
                return new Post(post)
            })
        })
}



export { fetchPosts, fetchPost, fetchRelatedPosts };
