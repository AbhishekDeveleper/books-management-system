

const fetchBtn  = document.getElementById('fetchBtn');
const category = document.getElementById('categories');
const tables = document.getElementById('tableid');


let uid= 0;

const loadingText =document.getElementById('loading-text');
// if(!tables){
//   loadingText.style.visibility='hidden';
// }
// loadingText.style.visibility='hidden';
loadingText.style.visibility='visible'
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
     if(category.value=="all") {
     
      elem.classList.remove('hidden');}
      
    })
  
    
    
  
  }
  category.addEventListener('change',changeCategory)
  
const fetchData = async()=>{
 
let newid;

    try{
      loadingText.style.visibility='visible';
      const res = await fetch(`https://openlibrary.org/subjects/${category.value}.json`)
     
      const bookData= await res.json();
      
      
      const bookDeails = bookData.works;
      bookDeails.map((book)=>{
        
        const tr  = document.createElement('tr');    
      const th1 = document.createElement('td');
      th1.textContent =book.title;
      const th2 = document.createElement('td');
      th2.textContent = book.authors[0].name;
      const th3 = document.createElement('td');
      th3.textContent = book.cover_id;
      const th4 = document.createElement('td');
      th4.textContent = book.first_publish_year;
      const th5 = document.createElement('td');
      console.log(fetchBtn.value);
      th5.textContent = category.value;
   
       
      tr.appendChild(th1)
      tr.appendChild(th2);
      tr.appendChild(th3)
      tr.appendChild(th4)
      tr.appendChild(th5);
  
       newid ='newclass-'+uid;
       const editid = 'edit-'+uid
       tr.setAttribute('class',newid)
      tr.classList.add(fetchBtn.value)
  
       tables.appendChild(tr);
       loadingText.style.visibility='hidden';
        console.log(book.title,book.first_publish_year,book.cover_id,book.authors[0].name);
      })
      
    }catch(err){
      console.log(err.message)
    } 
  }

  category.addEventListener('click',()=>{
    
    changeCategory()
    console.log('loading')
    
    fetchData();
  });
 


window.addEventListener('load',(e)=>{e.preventDefault(); fetchData()})