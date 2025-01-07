import { classController } from "./crud-operation.js";
const bookTable = document.getElementById("tableid");
const loadingText = document.getElementById("loading-text");
const fetchCategoryButton = document.getElementById("fetchBtn");
if (!bookTable || !loadingText || !fetchCategoryButton) {
    throw new Error("Required DOM elements not found.");
}
const { dm, domElem } = classController;
let uId = 0;
// Show loading text initially
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
        const response = await fetch(`https://openlibrary.org/subjects/${domElem.category.value}.json`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const bookData = await response.json();
        const bookDetails = bookData.works;
        bookDetails.forEach((book) => {
            const tr = document.createElement("tr");
            const th1 = document.createElement("td");
            th1.textContent = book.title;
            const th2 = document.createElement("td");
            th2.textContent = book.authors[0]?.name || "Unknown Author";
            const th3 = document.createElement("td");
            th3.textContent = book.cover_id || "N/A";
            const th4 = document.createElement("td");
            th4.textContent = book.first_publish_year.toString();
            const th5 = document.createElement("td");
            th5.textContent = domElem.category.value;
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            newBookRowId = `newBookRow-${uId}`;
            const editId = `edit-${uId}`;
            tr.setAttribute("class", newBookRowId);
            tr.classList.add(fetchCategoryButton.value);
            bookTable.appendChild(tr);
        });
        loadingText.style.visibility = "hidden";
    }
    catch (err) {
        alert(`Error message: ${err.message || err}`);
        loadingText.style.visibility = "hidden";
    }
};
// Add event listener for category selection and fetch data
domElem.category.addEventListener("click", () => {
    dm.searchAndFilterByCategory(domElem.category);
    fetchData();
});
// Fetch data on window load
window.addEventListener("load", (event) => {
    event.preventDefault();
    fetchData();
});
