import Post from '../entities/Post';
import axios from 'axios';

const fetchPosts = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=30');
    const posts = response.data;
    return posts.map(post => new Post(post))
}


const fetchPost = async postId => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const singlePost = response.data;
    return new Post(singlePost);
}

const fetchRelatedPosts = async postId => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${postId}`);
    const relatedPosts = response.data;
    return relatedPosts.map(relatedPost => new Post(relatedPost));

}

export { fetchPosts, fetchPost, fetchRelatedPosts };
