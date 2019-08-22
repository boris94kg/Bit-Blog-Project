
class Post {
    constructor(postObj) {
        this.id = postObj.id;
        this.authorId = postObj.userId;
        this.title = postObj.title;
        this.body = postObj.body;
    }
}

export default Post;