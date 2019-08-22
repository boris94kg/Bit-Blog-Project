class Comment {
    constructor(commentsObj) {
        this.postId = commentsObj.postId;
        this.commId = commentsObj.id;
        this.commName = commentsObj.name;
        this.commEmail = commentsObj.email;
        this.commBody = commentsObj.body;
    }
}

export default Comment;