import { classController } from "./crud-operation.js";

const { dm, domElem } = classController;

let uId: number = 0; // Unique ID for each book entry

interface Book {
  title: HTMLInputElement;
  author: HTMLInputElement;
  isbn: HTMLInputElement;
  publDate: HTMLInputElement;
  general: HTMLSelectElement;
  uid: string | number;
  bookPrice: HTMLInputElement;
}

// class to handle DOM operations
class DOMUtils {
  static hideElement(element: HTMLElement): void {
    element.style.visibility = "hidden";
  }

  static showElement(element: HTMLElement): void {
    element.style.visibility = "visible";
  }

  static isTableVisible(table: HTMLElement): boolean {
    return table.children.length >= 2;
  }

  static validateISBN(isbn: string): boolean {
    const regex = /[^0-9]/;
    return !regex.test(isbn);
  }

  static clearInputFields(inputs: HTMLInputElement[]): void {
    inputs.forEach((input) => (input.value = ""));
  }
}

// class for event handling
class EventHandlers {
  static onCategoryClick(): void {
    dm.filterByCategory();
  }

  static onAddBookClick(event: Event): void {
    event.preventDefault();

    uId += 1;

    const isbn = domElem.bookIsbn.value;

    if (!DOMUtils.validateISBN(isbn)) {
      domElem.bookIsbn.style.borderColor = "red";
      return;
    }

    domElem.bookIsbn.style.borderColor = "#33333336";

    if (
      !domElem.bookTitle.value ||
      !domElem.bookAuthor.value ||
      !isbn ||
      !domElem.bookPublDate.value ||
      !domElem.bookGeneral.value ||
      !domElem.bookPrice.value
    ) {
      alert("All fields are required!");
      return;
    }

    const newBook: Book = {
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
      domElem.bookPrice,
    ]);

    domElem.addBookBtn.value = "Add Book";
  }
}

class BookApp {
  static initialize(): void {
    DOMUtils.hideElement(domElem.tables);
    DOMUtils.hideElement(domElem.category);

    if (DOMUtils.isTableVisible(domElem.tables)) {
      DOMUtils.showElement(domElem.tables);
    }

    domElem.category.addEventListener("click", EventHandlers.onCategoryClick);

    if (domElem.addBookBtn) {
      domElem.addBookBtn.addEventListener(
        "click",
        EventHandlers.onAddBookClick
      );
    }
  }
}

// Initialize the application
BookApp.initialize();
