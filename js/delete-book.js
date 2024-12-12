const tables = document.getElementById('tableid');
import { category } from "./main.js";
const deleterow = (uid)=>{
    console.log(uid,'indelete')
    const delel = document.getElementsByClassName(uid);
    console.log(delel)
    delel[0].remove();
    console.log(tables.children.length,'length in delete')
    if(tables.children.length===1){ tables.style.visibility='hidden'; category.style.visibility='hidden'}
    if(tables.children.length>=2) {tables.style.visibility='visible' ;category.style.visibility='visible'}
      
}


export default deleterow;
