import Comment from '../entities/Comment.js';
import axios from 'axios';

const fetchComments = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
    const comments = response.data;
    return comments.map(comment => new Comment(comment))
}

const fetchComment = async postId => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}&_limit=0`);
    const commentCount = response.headers['x-total-count'];
    return commentCount;
}

export { fetchComments, fetchComment }