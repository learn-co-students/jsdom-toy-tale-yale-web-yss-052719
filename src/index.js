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
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {
    const collection = document.querySelector("div#toy-collection")
    toys.forEach(toy => {
      collection.innerHTML += `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" data-id=${toy.id}>Like <3</button>
      <button class="delete-btn" data-id=${toy.id}>Delete</button>
      </div>`
    });
  })

  document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault()

    const name = e.target.children[1].value
    const imgUrl = e.target.children[3].value

    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "image": imgUrl,
        "likes": 0
      })
    }).then(res => res.json())
    .then(toy => {
      console.log(toy)
      const collection = document.querySelector("div#toy-collection")
      collection.innerHTML += `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" data-id=${toy.id}>Like <3</button>
      <button class="delete-btn" data-id=${toy.id}>Delete</button>
      </div>`
    })
  })

  document.addEventListener("click", function(e){
    if (e.target.tagName === "BUTTON" && e.target.className === "like-btn") {
      let likeElement = e.target.previousElementSibling
      let likeCount = parseInt(likeElement.innerText.split(" ")[0], 10)
      likeCount += 1
      likeElement.innerText = `${likeCount} likes`
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": likeCount
        })
      })
    }

    else if (e.target.tagName === "BUTTON" && e.target.className === "delete-btn"){
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "DELETE"
      })
      .then(data => {
        e.target.parentElement.remove()
      })
    }
  })
})