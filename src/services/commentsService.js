import Comment from '../entities/Comment.js';
const axios = require('axios');

const fetchComments = () => {
    return axios.get('https://jsonplaceholder.typicode.com/comments')
        .then(res => res.data)
        .then(data => {
            return data.map(comment => {
                // console.log(comment);
                return new Comment(comment);
            })
        })
}

const fetchComment = (postId) => {
    return axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}&_limit=0`)
        .then(res => {

            const commentCount = res.headers['x-total-count'];
            return commentCount;
        })
}

export { fetchComments, fetchComment }