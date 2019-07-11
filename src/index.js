const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let toyBox = document.getElementById('toy-collection')
let addToy = false

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => {
    for(let i=0; i<data.length; i++) {
      toyBox.innerHTML += `<div class="card">
      <h2>${data[i].name}</h2>
      <img src=${data[i].image} class="toy-avatar" />
      <p>${data[i].likes} Likes </p>
      <button class="like-btn" data-id=${data[i].id}>Like <3</button>
      <button class="delete-btn" data-id=${data[i].id}>Delete</button>
    </div>`
    }

  })

  // adding 'like' functionality
  toyBox.addEventListener('click', function(event) {
    if(event.target.className === "like-btn") {

      // Incrementing the likes on the screen (conditional)

      likeElement = event.target.parentElement.children[2]
      let likes = parseInt(likeElement.innerText.split(" ")[0])
      likes += 1
      likeElement.innerText = `${likes} likes`

      // Patch request to server

      fetch(`http:localhost:3000/toys/${event.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": likes
        })
      })
    }
  })

  // adding 'delete' functionality
  toyBox.addEventListener('click', function(event) {
    if(event.target.className === "delete-btn") {
      
      // Delete request to server

      fetch(`http:localhost:3000/toys/${event.target.dataset.id}`, {
        method: "DELETE",
      })
      .then(data => {
        event.target.parentElement.remove()
      })
    }
  })
})

toyForm.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault()

  const toyName = event.target.children[1].value
  const toyUrl = event.target.children[3].value

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json" },
    body: JSON.stringify({
      "name": toyName,
      "image": toyUrl,
      "likes": 0
    })
  }) //closes fetch request
  .then(res => res.json())
  .then(data => {
    //update page
    toyBox.innerHTML += `<div class="card">
    <h2>${toyName}</h2>
    <img src=${toyUrl} class="toy-avatar" />
    <p>${data.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`
  })
})

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
