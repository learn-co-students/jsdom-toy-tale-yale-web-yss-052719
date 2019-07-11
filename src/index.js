https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSfYazjaMd87blgP-IQdVzKhVla2WwiQOgmPXckIsH-lC66dPSe76XE6hL0bw&usqp=CAc

function getToys(){
  fetch("http://localhost:3000/toys").then(response => {return response.json()})
}


document.addEventListener('DOMContentLoaded', function() {


const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false


// YOUR CODE HERE


function getToy(id){
  fetch(`http://localhost:3000/toys/${id}`).then(response => {return response.json()})
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    
    
   toyForm.addEventListener('submit', function(event){
    let name = event.target.children[1].value
    let image = event.target.children[3].value
    event.preventDefault()
    fetch('http://localhost:3000/toys',{
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify({
        "name": name,
        "image": image,
        "likes": 0
      })
    }).then(response => response.json())
    .then(toy => {
          debugger
          let card = document.createElement('div')
          card.className = 'card'
          let toyName = document.createElement('h2')
          toyName.innerText = toy.className
          let image = document.createElement('img')
          image.className = 'toy-avatar'
          image.src = toy.image
          let par = document.createElement('p')
          par.innerText = `Likes: ${toy.likes}`
          let button = document.createElement('button')
          button.innerText = 'Like Toy'
          button.className = "like-button"
          button.dataset.likes = toy.likes
          button.dataset.id = toy.id
    
          let toycollection = document.getElementById('toy-collection')
          toycollection.appendChild(card)
          card.appendChild(toyName)
          card.appendChild(image)
          card.appendChild(par)
          card.appendChild(button)
          debugger})})
    
  } else {
    toyForm.style.display = 'none'
  }
})

fetch("http://localhost:3000/toys").then(response => {return response.json()}).then(toys =>
  {
    toys.forEach((toy) =>{
      let card = document.createElement('div')
      card.className = 'card'
      let toyName = document.createElement('h2')
      toyName.innerText = toy.name
      let image = document.createElement('img')
      image.className = 'toy-avatar'
      image.src = toy.image
      let par = document.createElement('p')
      par.innerText = `Likes: ${toy.likes}`
      let button = document.createElement('button')
      button.innerText = 'Like Toy'
      button.className = "like-button"
      button.dataset.likes = toy.likes
      button.dataset.id = toy.id

      let toycollection = document.getElementById('toy-collection')
      toycollection.appendChild(card)
      card.appendChild(toyName)
      card.appendChild(image)
      card.appendChild(par)
      card.appendChild(button)
      

    })
  })


  document.addEventListener('click', function(event){
    if (event.target.className === 'like-button')
    {
     
      let likes = parseInt(event.target.dataset.likes) + 1 
      fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "likes": likes
        })}).then(response => response.json).then(refresh => {
          event.target.parentElement.children[2].innerText = `Likes: ${likes}`
          event.target.dataset.likes = likes
        })
      

    }
  })
    
    
 

})








