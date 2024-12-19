import { classController } from "./crud-operation.js";
const bookTable = document.getElementById("tableid");

const { dm, domElem } = classController;
let uId = 0;

const loadingText = document.getElementById("loading-text");

loadingText.style.visibility = "visible";

// Add event listener for category change
domElem.category.addEventListener("change", () => {
  dm.searchAndFilterByCategory(domElem.category);
});

// Function to fetch book data based on category
const fetchData = async () => {
  let newBookRowId;

  try {
    loadingText.style.visibility = "visible";
    const res = await fetch(
      `https://openlibrary.org/subjects/${domElem.category.value}.json`
    );

    const bookData = await res.json();

    const bookDeails = bookData.works;
    bookDeails.map((book) => {
      const tr = document.createElement("tr");
      const th1 = document.createElement("td");
      th1.textContent = book.title;
      const th2 = document.createElement("td");
      th2.textContent = book.authors[0].name;
      const th3 = document.createElement("td");
      th3.textContent = book.cover_id;
      const th4 = document.createElement("td");
      th4.textContent = book.first_publish_year;
      const th5 = document.createElement("td");
      const fetchCategoryButton = document.getElementById("fetchBtn");
      console.log(fetchCategoryButton);
      th5.textContent = domElem.category.value;

      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      tr.appendChild(th4);
      tr.appendChild(th5);

      newBookRowId = "newBookRow-" + uId;
      const editId = "edit-" + uId;
      tr.setAttribute("class", newBookRowId);
      tr.classList.add(fetchCategoryButton.value);

      bookTable.appendChild(tr);
      loadingText.style.visibility = "hidden";
      console.log(
        book.title,
        book.first_publish_year,
        book.cover_id,
        book.authors[0].name
      );
    });
  } catch (err) {
    console.log(err.message);
  }
};

// Add event listener for category selection and fetch data
domElem.category.addEventListener("click", () => {
  dm.searchAndFilterByCategory(domElem.category);
  console.log("loading");
  fetchData();
});

// Fetch data on window load
window.addEventListener("load", (event) => {
  event.preventDefault();
  fetchData();
});
