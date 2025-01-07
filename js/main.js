// Importing required classes
import { classController } from "./crud-operation.js";
const { dm, domElem } = classController;
let uId = 0; // Unique ID for each book entry
// Utility class to handle DOM operations (Single Responsibility)
class DOMUtils {
    static hideElement(element) {
        element.style.visibility = "hidden";
    }
    static showElement(element) {
        element.style.visibility = "visible";
    }
    static isTableVisible(table) {
        return table.children.length >= 2;
    }
    static validateISBN(isbn) {
        const regex = /[^0-9]/;
        return !regex.test(isbn);
    }
    static clearInputFields(inputs) {
        inputs.forEach(input => input.value = "");
    }
}
// Utility class for event handling (Open/Closed Principle)
class EventHandlers {
    static onCategoryClick() {
        dm.filterByCategory();
    }
    static onAddBookClick(event) {
        event.preventDefault();
        uId += 1;
        const isbn = domElem.bookIsbn.value;
        if (!DOMUtils.validateISBN(isbn)) {
            domElem.bookIsbn.style.borderColor = "red";
            return;
        }
        domElem.bookIsbn.style.borderColor = "#33333336";
        if (!domElem.bookTitle.value ||
            !domElem.bookAuthor.value ||
            !isbn ||
            !domElem.bookPublDate.value ||
            !domElem.bookGeneral.value ||
            !domElem.bookPrice.value) {
            alert("All fields are required!");
            return;
        }
        const newBook = {
            title: domElem.bookTitle,
            author: domElem.bookAuthor,
            isbn: domElem.bookIsbn,
            publDate: domElem.bookPublDate,
            general: domElem.bookGeneral,
            uid: uId,
            bookPrice: domElem.bookPrice,
        };
        dm.addBookToTable(newBook);
        dm.logData();
        DOMUtils.clearInputFields([
            domElem.bookTitle,
            domElem.bookAuthor,
            domElem.bookIsbn,
            domElem.bookPublDate,
            //   domElem.bookGeneral,
            domElem.bookPrice,
        ]);
        domElem.addBookBtn.value = "Add Book";
    }
}
// Main application logic (Interface Segregation and Dependency Inversion)
class BookApp {
    static initialize() {
        DOMUtils.hideElement(domElem.tables);
        DOMUtils.hideElement(domElem.category);
        if (DOMUtils.isTableVisible(domElem.tables)) {
            DOMUtils.showElement(domElem.tables);
        }
        domElem.category.addEventListener("click", EventHandlers.onCategoryClick);
        if (domElem.addBookBtn) {
            domElem.addBookBtn.addEventListener("click", EventHandlers.onAddBookClick);
        }
    }
}
// Initialize the application
BookApp.initialize();
