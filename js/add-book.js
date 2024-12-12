import deleterow from "./delete-book.js";
import { btn,category } from "./main.js";
const tables = document.getElementById('tableid');
import {editMode,editrow,editedItem} from './edit-book.js'
export const addBook = (title,author,isbn,publDate,general,uid)=>{
  const todayDate = new Date();

   const years = publDate.value.split('-')[0]-todayDate.getFullYear();
   const months =publDate.value.split('-')[1]- (todayDate.getMonth()+1);
   const days = publDate.value.split('-')[2]-todayDate.getDate();
   
  let newid;
      if(editMode.value===false){
        // btn.textContent='Add Book';
        console.log(editMode)
      const tr  = document.createElement('tr');    
      const th1 = document.createElement('td');
      th1.textContent = title.value;
      const th2 = document.createElement('td');
      th2.textContent = author.value;
      const th3 = document.createElement('td');
      th3.textContent = isbn.value;
      const th4 = document.createElement('td');
      th4.textContent = publDate.value;
      const th5 = document.createElement('td');
      th5.textContent = general.value;
      const th6  = document.createElement('td');
      
      const btn1  = document.createElement('button')    
      const btn2 = document.createElement('button');
      
      btn1.textContent='Edit';     
      btn2.textContent='Delete'
      
      btn2.addEventListener('click',()=>deleterow(newid));
      btn1.addEventListener('click',()=>editrow(newid));
      
      th6.appendChild(btn1);
      th6.appendChild(btn2);

      const th7 = document.createElement('td');
      th7.textContent= `${years}-Y /${months}-M /${days}-d`
       
      tr.appendChild(th1)
      tr.appendChild(th2);
      tr.appendChild(th3)
      tr.appendChild(th4)
      tr.appendChild(th5);
      tr.appendChild(th6)
      tr.appendChild(th7);
      //  const newid ='newclass-'+uid;
       newid ='newclass-'+uid;
       const editid = 'edit-'+uid
       tr.setAttribute('class',newid)
      tr.classList.add(general.value)
       btn1.setAttribute('class',editid);
       btn2.setAttribute('class',newid);
       tables.appendChild(tr);
       category.value="No Category"
      }else{
        console.log("In edited mode",editMode)
        // editedItem = document.getElementsByClassName(newid);
        btn.value='Update Book';
        const removeClass = editedItem[0].classList[1];
        editedItem[0].classList.remove(removeClass);
        editedItem[0].classList.add(general.value);
        console.log(editedItem[0].classList[1],'editedItem0');
        editedItem[0].children[0].innerText=title.value
        editedItem[0].children[1].innerText=author.value
        editedItem[0].children[2].innerText=isbn.value 
        editedItem[0].children[3].innerText=publDate.value 
        editedItem[0].children[4].innerText=general.value  
        editedItem[0].children[6].innerText=`${years}-Y /${months}-M /${days}-d`
        
        editMode.value=false
        category.value="No Category"
      }

   
     tables.style.visibility='visible'
     category.style.visibility='visible';
      
    }
    


