
function loadComments() {
    const commentsSection = document.getElementById('comments-section');
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    comments.forEach((comment, index) => {
        createCommentElement(comment, index);
    });
}


function createCommentElement(comment, index) {
    const commentsSection = document.getElementById('comments-section');
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.setAttribute('data-index', index);

    const commentAuthor = document.createElement('div');
    commentAuthor.classList.add('comment-author');
    commentAuthor.textContent = comment.author;

    const commentBody = document.createElement('div');
    commentBody.classList.add('comment-text');
    commentBody.textContent = comment.text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = () => deleteComment(index);

    commentDiv.appendChild(commentAuthor);
    commentDiv.appendChild(commentBody);
    commentDiv.appendChild(deleteButton);

    commentsSection.appendChild(commentDiv);
}


function addComment() {
    const commentText = document.getElementById('comment-text').value.trim();

    if (commentText === '') {
        alert('Пожалуйста, введите текст комментария.');
        return;
    }

    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const newComment = {
        author: 'Пользователь', 
        text: commentText
    };

    comments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));

    createCommentElement(newComment, comments.length - 1);

    document.getElementById('comment-text').value = '';
}


function deleteComment(index) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

   
    comments.splice(index, 1);
    localStorage.setItem('comments', JSON.stringify(comments));

    
    const commentsSection = document.getElementById('comments-section');
    commentsSection.innerHTML = ''; 
    loadComments(); 
}


window.onload = loadComments;
