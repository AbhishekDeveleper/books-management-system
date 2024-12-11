const tables = document.getElementById('tableid');
const deleterow = (uid)=>{
    console.log(uid,'indelete')
    const delel = document.getElementsByClassName(uid);
    console.log(delel)
    delel[0].remove();
    if(tables.children.length===1) tables.style.visibility='hidden';
    if(tables.children.length>=2) tables.style.visibility='visible'
      
}


export default deleterow;
