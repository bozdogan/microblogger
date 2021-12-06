const editPostBt = document.querySelector("#editPostBt");
const deletePostBt = document.querySelector("#deletePostBt");
const messagePanel = document.querySelector(".card .card-message");

const postId = document.querySelector("#postIdLb").innerHTML.trim();
let onEditMode = false;

const startEditMode = function() {
    if(!onEditMode) {
        onEditMode = true;

        
        const messageEditForm = document.createElement("form");
        messageEditForm.action = `/editpost/${postId}`;
        messageEditForm.method = "POST";

        const postEditTx = document.createElement("textarea");
        postEditTx.id = "postEditTx";
        postEditTx.name = "message";

        // NOTE(bora): It's probably better to get this from the server, tho.
        let message = messagePanel.innerHTML.trim();
        postEditTx.innerHTML = message;

        const saveBt = document.createElement("button");
        saveBt.id = "saveBt";
        saveBt.type = "submit";
        saveBt.innerHTML = "Save";

        saveBt.addEventListener("click", e => {
            console.log("SAVE clicked.");
            console.log("New post is: " + postEditTx.value);
        });
        
        messageEditForm.appendChild(postEditTx);
        messageEditForm.appendChild(saveBt);
        messagePanel.innerHTML = "";
        messagePanel.appendChild(messageEditForm);
        messagePanel.classList.add("on-edit");
    }
}

editPostBt.addEventListener("click", e => {
    startEditMode();
});

deletePostBt.addEventListener("click", e => {
    if(confirm("Are you sure you want to delete this post?")) {
        window.location.href = `/deletepost/${postId}`;
    }
});