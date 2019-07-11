const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
document.addEventListener("DOMContentLoaded", function(){
  fetch("http://localhost:3000/toys")
 .then(resp => resp.json())
 .then(data => {
   // console.log(data)
   // debugger
   const toyArea = document.querySelector("#toy-collection")
   // const ulTag = document.createElement('ul')
   // const toyUL = toyArea.appendChild(ulTag)

   for (let i = 0; i < data.length; i++){
     toyArea.innerHTML += `<div class="card">
     <h2>${data[i].name}</h2>
     <img src=${data[i].image} class="toy-avatar"/>
     <p> ${data[i].likes} Likes</p>
     <button class="like-btn" data-id=${data[i].id}>Like 👍</button>
     <button class="delete-btn" data-id=${data[i].id}>Delete 💀</button>
     </div>`
   }
 })

 document.querySelector('form').addEventListener('submit', function(e){

     e.preventDefault()

     const toyName = e.target.children[1].value
     const imgURL = e.target.children[3].value
     const toyCollection = document.querySelector("#toy-collection")

     fetch("http://localhost:3000/toys", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         'Accept': "application/json"
       },
       body: JSON.stringify({
         "name": toyName,
         "image": imgURL,
         "likes": "0"
       })
     }).then(res => res.json())
     .then(data => {
       toyCollection.innerHTML += `<div class="card">
       <h2>${data.name}</h2>
       <img src=${data.image} class="toy-avatar"/>
       <p> ${data.likes} Likes</p>
       <button class="like-btn" data-id=${data.id}>Like <3</button>
       <button class="delete-btn" data-id=${data.id}>Delete 💀</button>
       </div>`
     })

 })

 document.addEventListener('click', function(e){
   if (e.target.tagName === "BUTTON" && e.target.className === "like-btn"){
     let likeElement = e.target.previousElementSibling
     let likeCount = + likeElement.innerText.split(" ")[0]
     // console.log(likeCount)
     likeCount += 1

     likeElement.innerText= `${likeCount} likes`

     fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
       method: "PATCH",
       headers: {
         'Content-Type': 'application/json',
         'Accept': "application/json"
       },
       body: JSON.stringify({
         "likes": likeCount
       })
     })

   }
   else if (e.target.tagName === "BUTTON" && e.target.className === "delete-btn"){
     // console.log("working")
     fetch(`http://localhost:3000/toys/${e.target.dataset.id}`,{
       method: "DELETE"
     }).then(data => {
       e.target.parentElement.remove()
     })
   }
 })
})
