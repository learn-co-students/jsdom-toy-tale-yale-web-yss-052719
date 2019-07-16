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
document.addEventListener('DOMContentLoaded', function(){
  fetch(`http://localhost:3000/toys`, {
    method: "GET"
  })
  .then(resp => resp.json())
  .then(toys => {
      
      toys.forEach(toy => {
        divTag = document.querySelector(`#toy-collection`)
        divTag.innerHTML += `  <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn" data-id=${toy.id}>Like <3</button>
        <button class="delete-btn" data-id=${toy.id}> Delete </button>
      </div>
        `
      })     
  })


  document.querySelector("form").addEventListener("submit", function(e){
    e.preventDefault()
    console.log(e.target.children[1].value)
    fetch(`http://localhost:3000/toys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": e.target.children[1].value,
        "image": e.target.children[3].value,
        "likes": 0
      })
    })
    .then (resp=> resp.json())
    .then(data => {
      console.log(data)
      divTag = document.querySelector(`#toy-collection`)
      divTag.innerHTML += `<div class="card">
      <h2>${data.name}</h2>
      <img src=${data.image} class="toy-avatar" />
      <p>${data.likes} Likes </p>
      <button class="like-btn" data-id=${data.id}>Like <3</button>
      <button class="delete-btn" data-id=${data.id}> Delete </button>
    </div>
      `
    })
  })


  document.addEventListener("click", function(e){
  
    if(e.target.className === 'like-btn'){
      // console.log(e.target)

      let likes = e.target.parentElement.querySelector('p')
      let likenum = parseInt(likes.innerText.split(" ")[0], 10)
      likenum += 1
      likes.innerText = `${likenum} likes`
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
            "likes": likenum
        })
      })
    }else if(e.target.className === 'delete-btn'){
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "DELETE"
      })
      .then( data => {
        e.target.parentElement.remove()
      })
    }
  })








})