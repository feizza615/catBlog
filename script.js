let submitButton = document.querySelector("#submitButton");
let title = document.querySelector("#blogTitle");
let author = document.querySelector("#author");
let date = document.querySelector("#date");
let content = document.querySelector("#blog");
//Set database object REFERENCE here:
let database = firebase.database().ref();

/**
 * Updates the database with the username and message.
 */
submitButton.onclick = function updateDB(event){
    event.preventDefault(); //stop refreshing
    let blogTitle = title.value;
    let blogAuthor = author.value;
    let blogDate = date.value;
    let blogContent = content.value;
    //Update database here
    let value = {
        TITLE: blogTitle,
        AUTHOR: blogAuthor,
        DATE: blogDate,
        CONTENT: blogContent
    }

    database.push(value);
    title.value ="";
    author.value="";
    date.value="";
    content.value="";
}


//Set databse "child_added" event here:
database.on("child_added", addMessageToBoard);

//Make call back function:
//This function grabs a row of data
function addMessageToBoard(rowData){
    let row = rowData.val(); //return an object just like the one we pushed
    let body = document.querySelector("body");
    let blogContainer = document.createElement("div");
    blogContainer.classList.add('blog');

    let title = document.createElement("p");
    title.classList.add('titleText');
    let author = document.createElement("p");
    let date = document.createElement("p");
    let content = document.createElement("p");
    title.innerHTML= row.TITLE;
    author.innerHTML="Author: " + row.AUTHOR;
    date.innerHTML= "Date: " + row.DATE;
    content.innerHTML = "Dear Readers: " +row.CONTENT;

    blogContainer.appendChild(title);
    blogContainer.appendChild(author);
    blogContainer.appendChild(date);
    blogContainer.appendChild(content);
    body.appendChild(blogContainer);
}