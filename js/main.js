import {addBook} from "./add-book.js";
export const addBookBtn=document.getElementById("addBookBtn");
export const bookTitle=document.getElementById('title');
export const bookAuthor=document.getElementById('author');
export const bookIsbn=document.getElementById('isbn');
export const bookPublDate = document.getElementById('publicationDate');
export const bookGeneral = document.getElementById('gener');
const tables = document.getElementById('tableid');
export const category = document.getElementById('categories')


let uid= 0;

console.log(tables)
tables.style.visibility='hidden';
category.style.visibility='hidden'


const changeCategory=()=>{

  const allData = Object.values(document.getElementsByTagName('tr'));
  
  allData.map((elem,inde)=>{
    
    const classlist=elem.classList
      
   
   if(Object.values(classlist)[1]!=category.value ){
    if(Object.values(classlist)[1]!=undefined)

    
      elem.classList.add('hidden');
   }else{
    elem.classList.remove('hidden');
   }
   if(category.value=="No Category") {
   
    elem.classList.remove('hidden');}
    
  })

  
  

}
category.addEventListener('click',changeCategory)



if(tables.children.length>=2) tables.style.visibility='visible'
addBookBtn.addEventListener('click',(e)=>{
  
    e.preventDefault();
    uid = uid + 1
   
    
    
    const regex = /[^0-9]/;
    if(bookIsbn.value.match(regex)){
      bookIsbn.style.borderColor='red'
      
      // console.log('comes')
      return;
     
    }
    bookIsbn.style.borderColor='#33333336';
    if(bookTitle.value=="" || bookAuthor.value=="" || bookIsbn.value=="" || bookPublDate.value=="" || bookGeneral.value ==''){ 
      alert("All fields are reqquired !") 
      return}
     
      
     
 
     addBook(bookTitle,bookAuthor,bookIsbn,bookPublDate,bookGeneral,uid)
     bookTitle.value=""
     bookAuthor.value=""
     bookIsbn.value=""
     bookPublDate.value=""
     addBookBtn.value='Add Book'
     
   
  
  
})





      




