const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

document.addEventListener('DOMContentLoaded', function(){

// GET request to fetch all toys
  fetch("http://localhost:3000/toys", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }}).then(resp => resp.json()).then(data => {
      data.forEach(toy => {
        const toys = document.getElementById('toy-collection')
        const card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = `<h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn" data-id=${toy.id}>Like <3</button>
        <button class="delete-btn" data-id=${toy.id}>Delete</button>`
        toys.appendChild(card)
      })
    }) 

  // Button Events
  document.addEventListener('click', function(e){

    // Increases Like Count
    if (e.target.tagName === "BUTTON" && e.target.className === "like-btn"){
      let likes = e.target.parentElement.querySelector('p')
      let likeCount = parseInt(likes.innerText.split(" ")[0], 10)
      likeCount += 1

      likes.innerText = `${likeCount} Likes`
      
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "likes": likeCount
        })
      })
    } 

    // Deletes Toy
    else if (e.target.tagName === "BUTTON" && e.target.className === "delete-btn"){
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: 'DELETE'}).then(data => {
          e.target.parentElement.remove()
        })
      
      let card = e.target.parentElement
      card.remove()
    }
  })

  // Displays Form to Add Toy
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

  // Adds New Toy
  document.addEventListener('submit', function(e){
    e.preventDefault();

    //POST request to add toy
    fetch("http://localhost:3000/toys", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "name": e.target.children[1].value,
        "image": e.target.children[3].value,
        "likes": 0
      })
    }).then(response => response.json()).then(data => {
      const toys = document.getElementById('toy-collection')
      const card = document.createElement('div')
      card.className = 'card'
      card.innerHTML = `<h2>${data.name}</h2>
      <img src=${data.image} class="toy-avatar" />
      <p>${data.likes} Likes </p>
      <button class="like-btn" data-id=${data.id}>Like <3</button>
      <button class="delete-btn" data-id=${data.id}>Delete Toy</button>`

      toys.appendChild(card)
    })
  })
})
