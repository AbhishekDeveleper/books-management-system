import {addBook} from "./add-book.js";
export const btn=document.querySelector(".addBookBtn");
export const title=document.getElementById('title');
export const author=document.getElementById('author');
export const isbn=document.getElementById('isbn');
export const publDate = document.getElementById('publicationDate');
export const general = document.getElementById('gener');
const tables = document.getElementById('tableid');
let uid= 0;


tables.style.visibility='hidden';
  tables.style.opacity='none'

if(tables.children.length>=2) tables.style.visibility='visible'
btn.addEventListener('click',(e)=>{
  
    e.preventDefault();
    uid = uid + 1
    console.log(uid,'uid')
    console.log(typeof isbn);
    
    
    const regex = /[^0-9]/;
    if(isbn.value.match(regex)){
      alert("ISBN must be a number ! ");
      console.log('comes')
      return;
     
    }
    if(title.value=="" || author.value=="" || isbn.value=="" || publDate.value=="" || general.value ==''){ 
      alert("All fields are reqquired !") 
      return}
     
      
     
 
     addBook(title,author,isbn,publDate,general,uid)
   
   
     console.log(`Book Title : ${title.value} Book Author:${author.value} 
        ISBN: ${isbn.value} Publication Date: ${publDate.value}
        General : ${general.value}`)
  console.log("btn clicked")
  
})



