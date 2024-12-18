class DomElements{
  constructor(){
     
     this.addBookBtn=document.getElementById("addBookBtn");
     this.booksPrice= document.getElementById('bookPrice');
     this.bookTitle=document.getElementById('title');
    this.bookAuthor=document.getElementById('author');
    this.bookIsbn=document.getElementById('isbn');
    this.bookPublDate = document.getElementById('publicationDate');
    this.bookGeneral = document.getElementById('gener');
    this.tables = document.getElementById('tableid');
    this.category = document.getElementById('categories')
  }
}

const domElem = new DomElements();
let uid= 0;


domElem.tables.style.visibility='hidden';
domElem.category.style.visibility='hidden'




if(domElem.tables.children.length>=2) domElem.tables.style.visibility='visible'



class DataManager{
  #discountPrice = 0.1
  constructor(){
    this.editMode={value:false}
    this.editedItem=""
 
  }
  addBook(title,author,isbn,publDate,general,uid,bookPrice){
    const todayDate = new Date();

 const years = publDate.value.split('-')[0]-todayDate.getFullYear();
 const months =publDate.value.split('-')[1]- (todayDate.getMonth()+1);
 const days = publDate.value.split('-')[2]-todayDate.getDate();
 console.log(this.editMode);
let newid;
    if(this.editMode.value===false){
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
    const th9 = document.createElement('td');
    th9.textContent=bookPrice.value;
    const th10 = document.createElement('td');
    th10.textContent=bookPrice.value*this.#discountPrice;
    const btn1  = document.createElement('button')    
    const btn2 = document.createElement('button');
    
    btn1.textContent='Edit';     
    btn2.textContent='Delete'
    
    btn2.addEventListener('click',()=>this.deleterow(newid));
    btn1.addEventListener('click',()=>this.editrow(newid));
    
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
    tr.appendChild(th9);
    tr.appendChild(th10)
    
     newid ='newclass-'+uid;
     const editid = 'edit-'+uid
     tr.setAttribute('class',newid)
    tr.classList.add(general.value)
     btn1.setAttribute('class',editid);
     btn2.setAttribute('class',newid);
     domElem.tables.appendChild(tr);
     domElem.category.value="No Category"
    }else{
      console.log("In edited mode",this.editMode)
      
      domElem.addBookBtn.value='Update Book';
      const removeClass = this.editedItem[0].classList[1];
      this.editedItem[0].classList.remove(removeClass);
      this.editedItem[0].classList.add(general.value);
      console.log(this.editedItem[0].classList[1],'editedItem0');
      this.editedItem[0].children[0].innerText=title.value
      this.editedItem[0].children[1].innerText=author.value
      this.editedItem[0].children[2].innerText=isbn.value 
      this.editedItem[0].children[3].innerText=publDate.value 
      this.editedItem[0].children[4].innerText=general.value  
      this.editedItem[0].children[6].innerText=`${years}-Y /${months}-M /${days}-d`
      this.editedItem[0].children[7].innerText=bookPrice.value;
      this.editedItem[0].children[8].innerText=bookPrice.value*this.#discountPrice;
      
      this.editMode.value=false
      domElem.category.value="No Category"
    }

 
   domElem.tables.style.visibility='visible'
   domElem.category.style.visibility='visible';

  }

  deleterow(uid) {
    console.log(uid,'indelete')
    const delel = document.getElementsByClassName(uid);
    console.log(delel)
    delel[0].remove();
    console.log(domElem.tables.children.length,'length in delete')
    if(domElem.tables.children.length===1){ domElem.tables.style.visibility='hidden'; domElem.category.style.visibility='hidden'}
    if(domElem.tables.children.length>=2) {domElem.tables.style.visibility='visible' ;domElem.category.style.visibility='visible'}
      
}

editrow(uid){
   
domElem.addBookBtn.value='Update Book';
this.editMode.value = true;
console.log(this.editMode,'inediting')
this.editedItem = document.getElementsByClassName(uid);
console.log(this.editedItem[0]);
domElem.bookTitle.value = this.editedItem[0].children[0].innerText;
domElem.bookAuthor.value=this.editedItem[0].children[1].innerText;
domElem.bookIsbn.value = this.editedItem[0].children[2].innerText;
domElem.bookPublDate.value = this.editedItem[0].children[3].innerText;
domElem.bookGeneral.value  = this.editedItem[0].children[4].innerText;
domElem.booksPrice.value=this.editedItem[0].children[7].innerText;
}

changeCategory(){

  const allData = Object.values(document.getElementsByTagName('tr'));
  console.log(allData)
  console.log('Change Category function')
  allData.map((elem,inde)=>{
    
    const classlist=elem.classList
      
   
   if(Object.values(classlist)[1]!=domElem.category.value ){
    if(Object.values(classlist)[1]!=undefined)

    
      elem.classList.add('hidden');
   }else{
    elem.classList.remove('hidden');
   }
   if(domElem.category.value=="No Category") {
   
    elem.classList.remove('hidden');}
    
  })
}
}

const dm = new DataManager();

domElem.category.addEventListener('click',()=>dm.changeCategory())

domElem.addBookBtn.addEventListener('click',(e)=>{
  
    e.preventDefault();
    uid = uid + 1
   
  
    const regex = /[^0-9]/;
    if(domElem.bookIsbn.value.match(regex)){
      domElem.bookIsbn.style.borderColor='red'
      
      // console.log('comes')
      return;
     
    }
    domElem.bookIsbn.style.borderColor='#33333336';
    if(domElem.bookTitle.value=="" || domElem.bookAuthor.value=="" || domElem.bookIsbn.value=="" || domElem.bookPublDate.value=="" || domElem.bookGeneral.value =='' || domElem.booksPrice==""){ 
      alert("All fields are reqquired !") 
      return}


    
     dm.addBook(domElem.bookTitle,domElem.bookAuthor,domElem.bookIsbn,domElem.bookPublDate,domElem.bookGeneral,uid,domElem.booksPrice)
     domElem.bookTitle.value=""
     domElem.bookAuthor.value=""
     domElem.bookIsbn.value=""
     domElem.bookPublDate.value=""
     domElem.addBookBtn.value='Add Book'
      
})



console.log(domElem.addBookBtn);

export default DataManager;






      




