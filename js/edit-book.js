import { bookTitle,bookAuthor,bookIsbn,bookPublDate,bookGeneral,addBookBtn} from "./main.js";
export let editedItem
export let editMode={value:false}

export const editrow = (uid)=>{
   
    addBookBtn.value='Update Book';
editMode.value = true;
console.log(editMode,'inediting')
 editedItem = document.getElementsByClassName(uid);
 bookTitle.value = editedItem[0].children[0].innerText;
bookAuthor.value=editedItem[0].children[1].innerText;
bookIsbn.value = editedItem[0].children[2].innerText;
bookPublDate.value = editedItem[0].children[3].innerText;
bookGeneral.value  = editedItem[0].children[4].innerText;

}

