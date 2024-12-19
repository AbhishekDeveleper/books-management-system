
// DOMElements class initializes DOM elements to be used throughout the app
class DOMElements {
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

// Create a DOMElements object to access the DOM elements
const domElem = new DOMElements();

// BookDataManager class is responsible for managing the data (books) and the UI logic
class BookDataManager {
    #DISCOUNT_RATE = 0.1; // Constant discount rate of 10%
    
    constructor() {
      this.isEditModeActive = { value: false }; // Keeps track of whether edit mode is active
      this.editedBookRow = ""; // Stores the row being edited
    }

    // Adds a book to the table when not in edit mode
    addBookToTable(title, author, isbn, publDate, general, uid, bookPrice) {
      const todayDate = new Date();
  
      const years = publDate.value.split("-")[0] - todayDate.getFullYear();
      const months = publDate.value.split("-")[1] - (todayDate.getMonth() + 1);
      const days = publDate.value.split("-")[2] - todayDate.getDate();
      console.log(this.isEditModeActive);
      let newBookId;
  
      // If not in edit mode, create a new row for the book
      if (this.isEditModeActive.value === false) {
        const tr = document.createElement("tr");
        const titleCell = document.createElement("td");
        titleCell.textContent = title.value;
        const authorCell = document.createElement("td");
        authorCell.textContent = author.value;
        const isbnCell = document.createElement("td");
        isbnCell.textContent = isbn.value;
        const publDateCell = document.createElement("td");
        publDateCell.textContent = publDate.value;
        const generalCell = document.createElement("td");
        generalCell.textContent = general.value;
        const actionCell = document.createElement("td");
        const priceCell = document.createElement("td");
        priceCell.textContent = bookPrice.value;
        const discountCell = document.createElement("td");
        discountCell.textContent = bookPrice.value * this.#DISCOUNT_RATE;
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");
  
        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";
  
        // Add event listeners for delete and edit buttons
        deleteButton.addEventListener("click", () => this.deleteBookRow(newBookId));
        editButton.addEventListener("click", () => this.editBookRow(newBookId));
  
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
  
        const ageCell = document.createElement("td");
        ageCell.textContent = `${years}-Y /${months}-M /${days}-d`;
  
        tr.appendChild(titleCell);
        tr.appendChild(authorCell);
        tr.appendChild(isbnCell);
        tr.appendChild(publDateCell);
        tr.appendChild(generalCell);
        tr.appendChild(actionCell);
        tr.appendChild(ageCell);
        tr.appendChild(priceCell);
        tr.appendChild(discountCell);
  
        newBookId = "newBook-" + uid;
        const editId = "edit-" + uid;
        tr.setAttribute("class", newBookId);
        tr.classList.add(general.value);
        editButton.setAttribute("class", editId);
        deleteButton.setAttribute("class", newBookId);
        domElem.tables.appendChild(tr);
        domElem.category.value = "No Category";
      } else {
        console.log("In edit mode", this.isEditModeActive);
  
        domElem.addBookBtn.value = "Update Book"; // Change button text to "Update"
        
        // Update book row with new data from form inputs
        const previousCategoryClass = this.editedBookRow[0].classList[1];
        this.editedBookRow[0].classList.remove(previousCategoryClass);
        this.editedBookRow[0].classList.add(general.value);
        console.log(this.editedBookRow[0].classList[1], "editedBookRow[0]");
        
        this.editedBookRow[0].children[0].innerText = title.value;
        this.editedBookRow[0].children[1].innerText = author.value;
        this.editedBookRow[0].children[2].innerText = isbn.value;
        this.editedBookRow[0].children[3].innerText = publDate.value;
        this.editedBookRow[0].children[4].innerText = general.value;
        this.editedBookRow[0].children[6].innerText = `${years}-Y /${months}-M /${days}-d`;
        this.editedBookRow[0].children[7].innerText = bookPrice.value;
        this.editedBookRow[0].children[8].innerText =
          bookPrice.value * this.#DISCOUNT_RATE;
  
        this.isEditModeActive.value = false; // Turn off edit mode
        domElem.category.value = "No Category"; // Reset category value
      }
  
      // Make sure the table and category dropdown are visible
      domElem.tables.style.visibility = "visible";
      domElem.category.style.visibility = "visible";
    }

    // Deletes a book row from the table based on book ID
    deleteBookRow(bookId) {
      console.log(bookId, "in delete");
      const deleteRow = document.getElementsByClassName(bookId);
      console.log(deleteRow);
      
      // Remove the row and adjust visibility of table if no rows are present
      deleteRow[0].remove();
      console.log(domElem.tables.children.length, "length in delete");
      if (domElem.tables.children.length === 1) {
        domElem.tables.style.visibility = "hidden";
        domElem.category.style.visibility = "hidden";
      }
      if (domElem.tables.children.length >= 2) {
        domElem.tables.style.visibility = "visible";
        domElem.category.style.visibility = "visible";
      }
    }

    // Prepares a book row for editing by filling form fields with the current row data
    editBookRow(bookId) {
      domElem.addBookBtn.value = "Update Book"; // Change button text to "Update"
      this.isEditModeActive.value = true; // Enable edit mode
      console.log(this.isEditModeActive, "in editing");
      
      // Store the edited book row for later updating
      this.editedBookRow = document.getElementsByClassName(bookId);
      console.log(this.editedBookRow[0]);
      
      // Fill the form fields with the current row data
      domElem.bookTitle.value = this.editedBookRow[0].children[0].innerText;
      domElem.bookAuthor.value = this.editedBookRow[0].children[1].innerText;
      domElem.bookIsbn.value = this.editedBookRow[0].children[2].innerText;
      domElem.bookPublDate.value = this.editedBookRow[0].children[3].innerText;
      domElem.bookGeneral.value = this.editedBookRow[0].children[4].innerText;
      domElem.bookPrice.value = this.editedBookRow[0].children[7].innerText;
    }

    // Filters books by category selected in the dropdown
    filterByCategory() {
      const allRows = Object.values(document.getElementsByTagName("tr"));
      console.log(allRows);
      console.log("filterByCategory function");
      
      // Loop through all rows and hide those that don't match the selected category
      allRows.map((row, idx) => {
        const rowClasses = row.classList;
  
        if (Object.values(rowClasses)[1] !== domElem.category.value) {
          if (Object.values(rowClasses)[1] !== undefined)
            row.classList.add("hidden");
        } else {
          row.classList.remove("hidden");
        }
        if (domElem.category.value === "No Category") {
          row.classList.remove("hidden");
        }
      });
    }

    // Searches and filters books by the category provided in the search input
    searchAndFilterByCategory(search) {
      const allRows = Object.values(document.getElementsByTagName("tr"));
  
      // Loop through all rows and hide those that don't match the search query
      allRows.map((row, idx) => {
        const rowClasses = row.classList;
  
        if (Object.values(rowClasses)[1] !== search.value) {
          if (Object.values(rowClasses)[1] !== undefined)
            row.classList.add("hidden");
        } else {
          row.classList.remove("hidden");
        }
        if (search.value === "all") {
          row.classList.remove("hidden");
        }
      });
    }
}

// Create a BookDataManager object for managing book data
const dm = new BookDataManager();

// Export the controller for accessing the BookDataManager and DOM elements
export const classController = { dm, domElem };
