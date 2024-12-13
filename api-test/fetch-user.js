
const cardContainer = document.getElementById('card-container');
const fetchData = async()=>{
  try{
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const userData= await res.json();
    console.log(userData);
    userData.map((data)=>{
      const cardDiv=document.createElement('div')
      cardDiv.setAttribute('class','card');
      const p1Tag = document.createElement('p')
      p1Tag.innerText=`UserName : ${data.name}`
      const p2Tag=document.createElement('p');
      p2Tag.innerText=`EmailId : ${data.email}`;
      cardDiv.appendChild(p1Tag);
      cardDiv.appendChild(p2Tag);
      cardContainer.appendChild(cardDiv)
      console.log(data.id,data.name,data.username,data.email)
    })
   
    
  }catch(err){
    console.log(err.message)
  } 
}
fetchData();
      
