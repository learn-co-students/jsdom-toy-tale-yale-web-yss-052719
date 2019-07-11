const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let divTag = document.querySelector('#toy-collection')

// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', function(){

// renders all toys
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    toys.forEach((toy) => {
      divTag.innerHTML += `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button data-id=${toy.id} class="like-btn">Like <3</button>
      <button data-id=${toy.id} class="dlt-btn">Delete 😢</button>
    </div>`
    })
  }
    )

  document.querySelector('.add-toy-form').addEventListener('submit', function(e){
    e.preventDefault()
    const name = e.target.children[1].value
    const image = e.target.children[3].value

  // renders new toy
      fetch("http://localhost:3000/toys",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "image": image,
        "likes": 0
      })
    }).then(res => res.json())
    .then(toy => {
      divTag.innerHTML += `<div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button data-id=${toy.id} class="like-btn">Like <3</button>
        <button data-id=${toy.id} class="dlt-btn">Delete 😢</button>
      </div>`
    })
  })

  document.addEventListener('click', function(e) {
    if(e.target.tagName === 'BUTTON' && e.target.className === 'like-btn'){
      let likeElement = e.target.parentElement.children[2]
      let likeCount = parseInt(likeElement.innerText.split(' ')[0], 10)
      likeCount += 1
      likeElement.innerText = `${likeCount} Likes`
      fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
      method: "PATCH",  
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": likeCount
        })
      })
    }
    if(e.target.tagName === 'BUTTON' && e.target.className === 'dlt-btn'){
      fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
      method: "DELETE",
      })
      .then(data => {
        e.target.parentElement.remove()
      })
    }
  })

})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
    })
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
