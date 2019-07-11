/* 
https://i.dailymail.co.uk/i/pix/2015/09/01/18/2BE1E88B00000578-3218613-image-m-5_1441127035222.jpg
*/

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toys = document.querySelector('div#toy-collection')
let addToy = false

// YOUR CODE HERE

function toyCard(data){
  let div = document.createElement('div')
    div.setAttribute('class', 'card')
    div.innerHTML = 
      `<h2>${data.name}</h2>
      <img src="${data.image}" class="toy-avatar" />
      <p>${data.likes} Likes</p>
      <button class="like-btn" data-id=${data.id}>Like <3</button>
      <button class="delete-btn" data-id=${data.id}>Delete</button>`
      // if(data.image === "")
      // {div.image.src="https://i.dailymail.co.uk/i/pix/2015/09/01/18/2BE1E88B00000578-3218613-image-m-5_1441127035222.jpg"}
    toys.appendChild(div)
}

fetch("http://localhost:3000/toys")
.then(res => res.json())
.then(data => {
  for (let i=0; i<data.length; i++) {

    toyCard(data[i])
    // let div = document.createElement('div')
    // div.setAttribute('class', 'card')
    // div.innerHTML = 
    //   `<h2>${data[i].name}</h2>
    //   <img src=${data[i].image} class="toy-avatar" />
    //   <p>${data[i].likes} Likes</p>
    //   <button class="like-btn" data-id=${data[i].id}>Like <3</button>
    //   <button class="delete-btn" data-id=${data[i].id}>Delete</button>`
    // toys.appendChild(div)
  }
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    document.querySelector('form').addEventListener('submit', function(e){
      console.log(e)
      e.preventDefault()
      const toyName = e.target[0].value
      const toyImg = e.target[1].value

        fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": toyName,
          "image": toyImg,
          "likes": 0
        })
      }).then(res => res.json())
      .then(data => {
        toyCard(data)
        // let div = document.createElement('div')
        // div.setAttribute('class', 'card')
        // div.innerHTML = 
        //   `<h2>${data.name}</h2>
        //   <img src=${data.image} class="toy-avatar" />
        //   <p>${data.likes} Likes</p>
        //   <button data-id=${data.id} class="like-btn">Like <3</button>
        //   <button data-id=${data.id} class="delete-btn">Delete</button>`
        // toys.appendChild(div)
      })
    })
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

document.addEventListener('click', function(e){
  console.log(e)
  if(e.target.tagName === "BUTTON" && e.target.className === "like-btn"){
    let likeElement = e.target.previousElementSibling
    let likeCount = parseInt(likeElement.innerText.split(" ")[0], 10)
    console.log(likeCount) 
    likeCount += 1
    likeElement.innerText = `${likeCount} Likes`

    console.log(e.target.dataset.id)
    fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: likeCount
      })
    })
  } else if(e.target.tagName === "BUTTON" && e.target.className === "delete-btn"){
    fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
      method: "DELETE"
    })
    .then(data => {
      e.target.parentElement.remove()
    })
  }
})
