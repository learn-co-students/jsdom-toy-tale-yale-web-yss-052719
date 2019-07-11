const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toySubform = document.querySelector('.add-toy-form')

const toyTag = document.getElementById('toy-collection')

let addToy = false



// Requests

// GET 
fetch("http://localhost:3000/toys", {
    method: "GET",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  }).then(res => res.json()).then(data => {
    for (let i= 0; i < data.length; i++) {
      toyTag.innerHTML +=`<div class="card"> 
                            <h2>${data[i].name}</h2> 
                              <img src=${data[i].image} class="toy-avatar" />
                              <p> ${data[i].likes} Likes </p>
                              <button class="like-btn" data-id= ${data[i].id}>Like <3</button>
                          </div>`
    }
  })
// POST 

  


// Listeners

// ADD TOY LISTENER
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

// CREATE TOY LISTENER
toySubform.addEventListener('submit', function(e){
  e.preventDefault();
  const nameField = toySubform.children[1].value
  const urlField = toySubform.children[3].value

  const toyData = Object.create(null)
    toyData.name = nameField
    toyData.image = urlField
    toyData.likes = 0
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyData)
    }).then(response => response.json()).then(data => {
        toyTag.innerHTML +=`<div class="card"> 
                              <h2>${data.name}</h2> 
                                <img src=${data.image} class="toy-avatar" />
                                <p> ${data.likes} Likes </p>
                                <button class="like-btn" data-id= ${data.id}> Like <3</button>
                            </div>`
    })

})

// add a like
toyTag.addEventListener('click', function(e) {
  e.preventDefault();
  if (e.target.tagName === "BUTTON" && e.target.className === "like-btn") {
    // find like element and split
    let likeElement = e.target.previousElementSibling
    let likeSplit = likeElement.innerText.split(" ")
    // turn into an int
    let likeCount = parseInt(likeSplit[0])
    // incremenet that intger
    likeCount += 1
    // modify inner text
    likeElement.innerText = `${likeCount} Likes`
    // patch method 
    fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": likeCount
      })
  })
  }
})






