interface Book {
  title: HTMLInputElement;
  author: HTMLInputElement;
  isbn: HTMLInputElement;
  publDate: HTMLInputElement;
  general: HTMLSelectElement;
  uid: string | number;
  bookPrice: HTMLInputElement;
}

interface BookId {
  bookId: string;
}

// Interface for DOM Elements
interface DOMElementsInterface {
  addBookBtn: HTMLButtonElement;
  bookPrice: HTMLInputElement;
  bookTitle: HTMLInputElement;
  bookAuthor: HTMLInputElement;
  bookIsbn: HTMLInputElement;
  bookPublDate: HTMLInputElement;
  bookGeneral: HTMLSelectElement;
  tables: HTMLElement;
  category: HTMLSelectElement;
}

function LogMethod(
  target: any,
  propertyKey: any,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;
  descriptor.value = function () {
    const domElement = this as DOMElements;
    console.log(`Booktitle : ${domElem.bookTitle?.value}  BookAuthor : ${domElem.bookAuthor?.value}  BookIsbn : ${domElem.bookIsbn?.value}
                    BookCategory : ${domElem.bookGeneral?.value}  BookPrice : ${domElem.bookPrice?.value}`);
    return originalMethod.apply(this);
  };
  return descriptor;
}

// Utility class for handling DOM interactions
class DOMElements implements DOMElementsInterface {
  addBookBtn: HTMLButtonElement;
  bookPrice: HTMLInputElement;
  bookTitle: HTMLInputElement;
  bookAuthor: HTMLInputElement;
  bookIsbn: HTMLInputElement;
  bookPublDate: HTMLInputElement;
  bookGeneral: HTMLSelectElement;
  tables: HTMLElement;
  category: HTMLSelectElement;

  constructor() {
    this.addBookBtn = document.getElementById(
      "addBookBtn"
    ) as HTMLButtonElement;
    this.bookPrice = document.getElementById("bookPrice") as HTMLInputElement;
    this.bookTitle = document.getElementById("title") as HTMLInputElement;
    this.bookAuthor = document.getElementById("author") as HTMLInputElement;
    this.bookIsbn = document.getElementById("isbn") as HTMLInputElement;
    this.bookPublDate = document.getElementById(
      "publicationDate"
    ) as HTMLInputElement;
    this.bookGeneral = document.getElementById("gener") as HTMLSelectElement;
    this.tables = document.getElementById("tableid") as HTMLElement;
    this.category = document.getElementById("categories") as HTMLSelectElement;
  }
}

// Abstract class for Book operations
abstract class BookOperations {
  abstract addBookToTable<T extends Book>(book: T): void;
  abstract deleteBookRow<T extends BookId>(book: T): void;
  abstract editBookRow<T extends BookId>(book: T): void;
  abstract filterByCategory(): void;
  abstract searchAndFilterByCategory(search: HTMLSelectElement): void;
}

// Implementation class for Book operations
class BookDataManager extends BookOperations {
  private readonly DISCOUNT_RATE: number = 0.1; // Constant discount rate of 10%
  private isEditModeActive: { value: boolean };
  private editedBookRow: HTMLElement | null;

  constructor() {
    super();
    this.isEditModeActive = { value: false };
    this.editedBookRow = null;
  }

  @LogMethod
  logData() {
    // console.log("Logging Data ....");
  }

  addBookToTable<T extends Book>(book: T): void {
    const todayDate = new Date();

    const [pubYear, pubMonth, pubDay] = book.publDate.value
      .split("-")
      .map(Number);
    const years = pubYear - todayDate.getFullYear();
    const months = pubMonth - (todayDate.getMonth() + 1);
    const days = pubDay - todayDate.getDate();
    let ageDifference: number;
    let bookAge: string;
    ageDifference = years * 365 + months * 30 + days;
    if (ageDifference > 0) {
      bookAge = `Publishing after ${ageDifference} days`;
    } else if (ageDifference == 0) {
      bookAge = `Published Today`;
    } else {
      ageDifference = ageDifference * -1;
      bookAge = `Published before ${ageDifference} days`;
    }

    if (!this.isEditModeActive.value) {
      const tr = this.createTableRow(book, years, months, days, bookAge);
      domElem.tables.appendChild(tr);
      domElem.category.value = "No Category";
    } else {
      this.updateExistingRow(book, years, months, days, bookAge);
    }

    domElem.tables.style.visibility = "visible";
    domElem.category.style.visibility = "visible";
  }

  deleteBookRow<T extends BookId>(book: T): void {
    const deleteRow = document.querySelector(`.${book.bookId}`) as HTMLElement;
    if (deleteRow) {
      deleteRow.remove();
    }

    if (domElem.tables.children.length <= 1) {
      domElem.tables.style.visibility = "hidden";
      domElem.category.style.visibility = "hidden";
    }
  }

  editBookRow<T extends BookId>(book: T): void {
    domElem.addBookBtn.value = "Update Book";
    this.isEditModeActive.value = true;

    const row = document.querySelector(`.${book.bookId}`) as HTMLElement;
    this.editedBookRow = row;

    if (row) {
      this.populateFormFields(row);
    }
  }

  filterByCategory(): void {
    const allRows = Array.prototype.slice
      .call(domElem.tables.querySelectorAll("tr"))
      .slice(1);

    const selectedCategory = domElem.category.value;

    allRows.forEach((row) => {
      if (
        selectedCategory === "No Category" ||
        row.classList.contains(selectedCategory)
      ) {
        row.classList.remove("hidden");
      } else {
        row.classList.add("hidden");
      }
    });
  }
  // Function for searching boos by their category
  searchAndFilterByCategory(search: HTMLSelectElement): void {
    const allRows = Array.prototype.slice
      .call(domElem.tables.querySelectorAll("tr"))
      .slice(1);

    const searchValue = search.value.toLowerCase();

    allRows.forEach((row) => {
      if (searchValue === "all" || row.classList.contains(searchValue)) {
        row.classList.remove("hidden");
      } else {
        row.classList.add("hidden");
      }
    });
  }
  //function for creatng Table row and inserting table data in it
  private createTableRow(
    book: Book,
    years: number,
    months: number,
    days: number,
    bookAge: string
  ): HTMLElement {
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
    tr.appendChild(
      this.createTableCell(
        (Number(book.bookPrice.value) * this.DISCOUNT_RATE).toFixed(2)
      )
    );

    return tr;
  }

  private createTableCell(content: string): HTMLElement {
    const cell = document.createElement("td");
    cell.textContent = content;
    return cell;
  }
  //function for creating table row table data
  private createActionsCell(book: Book): HTMLElement {
    const actionCell = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () =>
      this.deleteBookRow({ bookId: `newBook-${book.uid}` })
    );
    editButton.addEventListener("click", () =>
      this.editBookRow({ bookId: `newBook-${book.uid}` })
    );

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    return actionCell;
  }
  // function for updating current selected row
  private updateExistingRow(
    book: Book,
    years: number,
    months: number,
    days: number,
    bookAge: string
  ): void {
    domElem.addBookBtn.value = "Add Book";
    if (this.editedBookRow) {
      const previousCategoryClass = this.editedBookRow.classList[1];
      this.editedBookRow.classList.replace(
        previousCategoryClass,
        book.general.value
      );

      this.editedBookRow.children[0].textContent = book.title.value;
      this.editedBookRow.children[1].textContent = book.author.value;
      this.editedBookRow.children[2].textContent = book.isbn.value;
      this.editedBookRow.children[3].textContent = book.publDate.value;
      this.editedBookRow.children[4].textContent = book.general.value;
      this.editedBookRow.children[6].textContent = bookAge;
      this.editedBookRow.children[7].textContent = book.bookPrice.value;
      this.editedBookRow.children[8].textContent = (
        Number(book.bookPrice.value) * this.DISCOUNT_RATE
      ).toFixed(2);
    }

    this.isEditModeActive.value = false;
    domElem.category.value = "No Category";
  }

  // function to populate data in form Fields
  private populateFormFields(row: HTMLElement): void {
    domElem.bookTitle.value = row.children[0].textContent || "";
    domElem.bookAuthor.value = row.children[1].textContent || "";
    domElem.bookIsbn.value = row.children[2].textContent || "";
    domElem.bookPublDate.value = row.children[3].textContent || "";
    domElem.bookGeneral.value = row.children[4].textContent || "";
    domElem.bookPrice.value = row.children[7].textContent || "";
  }
}


// Create a DOMElements object to access the DOM elements
const domElem = new DOMElements();

// Export the controller for accessing the BookDataManager and DOM elements
export const classController = { dm: new BookDataManager(), domElem };
