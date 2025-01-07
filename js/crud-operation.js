var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function LogMethod(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function () {
        const domElement = this;
        console.log(`Booktitle : ${domElem.bookTitle?.value}  BookAuthor : ${domElem.bookAuthor?.value}  BookIsbn : ${domElem.bookIsbn?.value}
                    BookCategory : ${domElem.bookGeneral?.value}  BookPrice : ${domElem.bookPrice?.value}`);
        return originalMethod.apply(this);
    };
    return descriptor;
}
// Utility class for handling DOM interactions
class DOMElements {
    addBookBtn;
    bookPrice;
    bookTitle;
    bookAuthor;
    bookIsbn;
    bookPublDate;
    bookGeneral;
    tables;
    category;
    constructor() {
        this.addBookBtn = document.getElementById("addBookBtn");
        this.bookPrice = document.getElementById("bookPrice");
        this.bookTitle = document.getElementById("title");
        this.bookAuthor = document.getElementById("author");
        this.bookIsbn = document.getElementById("isbn");
        this.bookPublDate = document.getElementById("publicationDate");
        this.bookGeneral = document.getElementById("gener");
        this.tables = document.getElementById("tableid");
        this.category = document.getElementById("categories");
    }
}
// Abstract class for Book operations
class BookOperations {
}
// Implementation class for Book operations
class BookDataManager extends BookOperations {
    DISCOUNT_RATE = 0.1; // Constant discount rate of 10%
    isEditModeActive;
    editedBookRow;
    constructor() {
        super();
        this.isEditModeActive = { value: false };
        this.editedBookRow = null;
    }
    logData() {
        // console.log("Logging Data ....");
    }
    addBookToTable(book) {
        const todayDate = new Date();
        const [pubYear, pubMonth, pubDay] = book.publDate.value
            .split("-")
            .map(Number);
        const years = pubYear - todayDate.getFullYear();
        const months = pubMonth - (todayDate.getMonth() + 1);
        const days = pubDay - todayDate.getDate();
        let ageDifference;
        let bookAge;
        ageDifference = years * 365 + months * 30 + days;
        if (ageDifference > 0) {
            bookAge = `Publishing after ${ageDifference} days`;
        }
        else if (ageDifference == 0) {
            bookAge = `Published Today`;
        }
        else {
            ageDifference = ageDifference * -1;
            bookAge = `Published before ${ageDifference} days`;
        }
        if (!this.isEditModeActive.value) {
            const tr = this.createTableRow(book, years, months, days, bookAge);
            domElem.tables.appendChild(tr);
            domElem.category.value = "No Category";
        }
        else {
            this.updateExistingRow(book, years, months, days, bookAge);
        }
        domElem.tables.style.visibility = "visible";
        domElem.category.style.visibility = "visible";
    }
    deleteBookRow(book) {
        const deleteRow = document.querySelector(`.${book.bookId}`);
        if (deleteRow) {
            deleteRow.remove();
        }
        if (domElem.tables.children.length <= 1) {
            domElem.tables.style.visibility = "hidden";
            domElem.category.style.visibility = "hidden";
        }
    }
    editBookRow(book) {
        domElem.addBookBtn.value = "Update Book";
        this.isEditModeActive.value = true;
        const row = document.querySelector(`.${book.bookId}`);
        this.editedBookRow = row;
        if (row) {
            this.populateFormFields(row);
        }
    }
    filterByCategory() {
        const allRows = Array.prototype.slice
            .call(domElem.tables.querySelectorAll("tr"))
            .slice(1);
        const selectedCategory = domElem.category.value;
        allRows.forEach((row) => {
            if (selectedCategory === "No Category" ||
                row.classList.contains(selectedCategory)) {
                row.classList.remove("hidden");
            }
            else {
                row.classList.add("hidden");
            }
        });
    }
    // Function for searching boos by their category
    searchAndFilterByCategory(search) {
        const allRows = Array.prototype.slice
            .call(domElem.tables.querySelectorAll("tr"))
            .slice(1);
        const searchValue = search.value.toLowerCase();
        allRows.forEach((row) => {
            if (searchValue === "all" || row.classList.contains(searchValue)) {
                row.classList.remove("hidden");
            }
            else {
                row.classList.add("hidden");
            }
        });
    }
    //function for creatng Table row and inserting table data in it
    createTableRow(book, years, months, days, bookAge) {
        const tr = document.createElement("tr");
        tr.className = `newBook-${book.uid} ${book.general.value}`;
        tr.appendChild(this.createTableCell(book.title.value));
        tr.appendChild(this.createTableCell(book.author.value));
        tr.appendChild(this.createTableCell(book.isbn.value));
        tr.appendChild(this.createTableCell(book.publDate.value));
        tr.appendChild(this.createTableCell(book.general.value));
        tr.appendChild(this.createActionsCell(book));
        tr.appendChild(this.createTableCell(bookAge));
        tr.appendChild(this.createTableCell(book.bookPrice.value));
        tr.appendChild(this.createTableCell((Number(book.bookPrice.value) * this.DISCOUNT_RATE).toFixed(2)));
        return tr;
    }
    createTableCell(content) {
        const cell = document.createElement("td");
        cell.textContent = content;
        return cell;
    }
    //function for creating table row table data
    createActionsCell(book) {
        const actionCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => this.deleteBookRow({ bookId: `newBook-${book.uid}` }));
        editButton.addEventListener("click", () => this.editBookRow({ bookId: `newBook-${book.uid}` }));
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        return actionCell;
    }
    // function for updating current selected row
    updateExistingRow(book, years, months, days, bookAge) {
        domElem.addBookBtn.value = "Add Book";
        if (this.editedBookRow) {
            const previousCategoryClass = this.editedBookRow.classList[1];
            this.editedBookRow.classList.replace(previousCategoryClass, book.general.value);
            this.editedBookRow.children[0].textContent = book.title.value;
            this.editedBookRow.children[1].textContent = book.author.value;
            this.editedBookRow.children[2].textContent = book.isbn.value;
            this.editedBookRow.children[3].textContent = book.publDate.value;
            this.editedBookRow.children[4].textContent = book.general.value;
            this.editedBookRow.children[6].textContent = bookAge;
            this.editedBookRow.children[7].textContent = book.bookPrice.value;
            this.editedBookRow.children[8].textContent = (Number(book.bookPrice.value) * this.DISCOUNT_RATE).toFixed(2);
        }
        this.isEditModeActive.value = false;
        domElem.category.value = "No Category";
    }
    // function to populate data in form Fields
    populateFormFields(row) {
        domElem.bookTitle.value = row.children[0].textContent || "";
        domElem.bookAuthor.value = row.children[1].textContent || "";
        domElem.bookIsbn.value = row.children[2].textContent || "";
        domElem.bookPublDate.value = row.children[3].textContent || "";
        domElem.bookGeneral.value = row.children[4].textContent || "";
        domElem.bookPrice.value = row.children[7].textContent || "";
    }
}
__decorate([
    LogMethod
], BookDataManager.prototype, "logData", null);
// Decorator for logging method calls
// Create a DOMElements object to access the DOM elements
const domElem = new DOMElements();
// Export the controller for accessing the BookDataManager and DOM elements
export const classController = { dm: new BookDataManager(), domElem };
