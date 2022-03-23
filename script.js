/* eslint-disable no-unused-vars */
// Book Class: Represents a Book
// eslint-disable-next-line max-classes-per-file
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Store Classs: Hundles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(author) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// UI Class: Hundle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.getElementById('book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td><a href="#" class="btn btn-danger btn-sm remove">Remove</a></td>
        `;
    list.appendChild(row);
  }

  static removeBook(element) {
    if (element.classList.contains('remove')) {
      element.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }
}

// Event: Dispaly Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event: Add a Book
document.getElementById('book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();
  //   GEt form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  // Instantiate book
  const book = new Book(title, author);
  // Add book to UI
  UI.addBookToList(book);
  // Add book to Store
  Store.addBook(book);
  // Clear fields
  UI.clearFields();
});
// Event: Remove a Book
document.getElementById('book-list').addEventListener('click', (e) => {
  UI.removeBook(e.target);
});