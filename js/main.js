import { classController } from "./crud-operation.js";

// Destructuring to get data manager and DOM elements from the classController
const { dm, domElem } = classController;

let uId = 0; // Unique ID for each book entry

// Initially hide the table and category select field
domElem.tables.style.visibility = "hidden";
domElem.category.style.visibility = "hidden";

// Show the table if there are any existing rows
if (domElem.tables.children.length >= 2) {
  domElem.tables.style.visibility = "visible";
}

// Event listener for the category dropdown (click event triggers filtering of books by category)
domElem.category.addEventListener("click", () => {
  // Filters books based on the selected category
  dm.filterByCategory();
});

// Check if the "Add Book" button exists and add event listener for click action
if (domElem.addBookBtn) {
  domElem.addBookBtn.addEventListener("click", (event) => {
    event.preventDefault();

    uId = uId + 1; // Increment the unique ID for the new book entry

    const regex = /[^0-9]/; // Regular expression to check if ISBN contains non-numeric characters

    if (domElem.bookIsbn.value.match(regex)) {
      domElem.bookIsbn.style.borderColor = "red";
      return;
    }
    domElem.bookIsbn.style.borderColor = "#33333336";

    // Check if any of the required fields are empty, show an alert if so
    if (
      domElem.bookTitle.value == "" ||
      domElem.bookAuthor.value == "" ||
      domElem.bookIsbn.value == "" ||
      domElem.bookPublDate.value == "" ||
      domElem.bookGeneral.value == "" ||
      domElem.bookPrice.value == ""
    ) {
      alert("All fields are required!"); // Alert if any field is empty
      return;
    }

    // Add the book to the table with the provided input values
    dm.addBookToTable(
      domElem.bookTitle,
      domElem.bookAuthor,
      domElem.bookIsbn,
      domElem.bookPublDate,
      domElem.bookGeneral,
      uId,
      domElem.bookPrice
    );

    // Clear the input fields after adding the book to the table
    domElem.bookTitle.value = "";
    domElem.bookAuthor.value = "";
    domElem.bookIsbn.value = "";
    domElem.bookPublDate.value = "";
    domElem.bookGeneral.value = "";
    domElem.bookPrice.value = "";

    // Reset the "Add Book" button text to its default value
    domElem.addBookBtn.value = "Add Book";
  });
}
