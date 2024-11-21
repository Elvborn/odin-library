const container = document.querySelector("#container");
const dialogBtn = document.querySelector(".add-new");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const returnBtn = document.querySelector(".return-button");

const inputs = document.querySelectorAll("input, select");

const library = [];

function Book(name, author, pages, read){
    this.id = Date.now().toString(32) + Math.random().toString(32);
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(name, author, pages, read){
    library.push(new Book(name, author, pages, read));

    updateContainer();
}

function updateContainer(){
    container.innerHTML = "";

    library.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("href", "#");

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "card-delete"
        card.append(deleteBtn);

        deleteBtn.addEventListener("click", (e) => {
            library.splice(library.indexOf(book), 1);
            updateContainer();
        });

        const name = document.createElement("p");
        name.classList.add("name");
        name.textContent = book.name;
        card.append(name);

        const author = document.createElement("p");
        author.classList.add("author");
        author.textContent = book.author;
        card.append(author);

        const pages = document.createElement("p");
        pages.classList.add("pages");
        pages.textContent = "Pages: " + book.pages;
        card.append(pages);

        const read = document.createElement("p");
        read.classList.add("read");
        read.textContent = book.read == true ? "You have read this book!" : "You have NOT read this book!";
        card.append(read);

        const toggleRead = document.createElement("span");
        toggleRead.className = "toggle";
        toggleRead.classList.add(book.read ? "book-read" : "book-not-read");
        read.append(toggleRead);

        toggleRead.addEventListener("click", () => {
            book.read = !book.read;
            updateContainer();
        });

        container.append(card);
    });
}

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("Ulysses", "James Joyce", 1000, false);
addBookToLibrary("In Search of Lost Time", "Marcel Proust", 4300, true);

console.log(library)

dialogBtn.addEventListener("click", () => {
    dialog.showModal();
});

form.addEventListener("submit", () => {
    const book = Array.from(inputs).reduce((init, input) => {
        if(input.id === "read")
            init[input.id] = input.value === "true" ? true : false;
        else
            init[input.id] = input.value;
        
        return init;
    }, {});

    addBookToLibrary(book.name, book.author, book.pages, book.read); 

    // Clear input fields on submit
    inputs.forEach(input => {
        if(input.id === "read")
            input.value = "false";
        else
            input.value = "";
    });
});

returnBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});