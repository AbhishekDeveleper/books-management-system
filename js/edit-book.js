import { title,author,isbn,publDate,general,btn} from "./main.js";
export let editedItem
export let editMode={value:false}

export const editrow = (uid)=>{
    console.log(btn,' btn')
    btn.value='Update Book';
editMode.value = true;
console.log(editMode,'inediting')
 editedItem = document.getElementsByClassName(uid);
title.value = editedItem[0].children[0].innerText;
author.value=editedItem[0].children[1].innerText;
isbn.value = editedItem[0].children[2].innerText;
publDate.value = editedItem[0].children[3].innerText;
general.value  = editedItem[0].children[4].innerText;

}

