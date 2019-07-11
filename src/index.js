const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
// 1. Add toy info to the card
fetch("http://localhost:3000/toys")
.then(res => res.json())
.then(toy => {
// console.log(toy);

  // With the response data, make a <div class="card"> for each toy and add it to the toy-collection div
const toyCollection = document.getElementById('toy-collection')
// find the parent element by id
for(let i = 0; i < toy.length; i++) {

  const divTag = document.createElement('div')
  // create div element
  // add items inside the parent -- <div>
  divTag.innerHTML += `<ul>
  <h2>${toy[i].name}</h2>
  <img src=${toy[i].image} class="toy-avatar" />
  <p>${toy[i].likes} Likes </p>
  <button data-id=${toy[i].id} class="like-btn">Like <3</button>
  </ul>`
  // set data-id to dataset to identify a specific toy 

  toyCollection.appendChild(divTag)
  // add to the parent to show on the page
}
});

// 2. Add a new toy
// user clicks on add new toy button
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    document.querySelector('form').addEventListener('submit', function(e){
      // find the form class
      // the event for form is always submit and not click
      e.preventDefault()
      // console.log(e) * make sure to do this step to check for the target value
      const toyName = e.target[0].value
      const img = e.target[1].value

      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          'name': toyName,
          'image': img,
          'likes': 0
        })
      }).then(res => res.json())
      .then(toy => {
        const divTag = document.getElementById('toy-collection')
        // find find the parent
        // add it to elements to the parent
        // make sure to check the if name in index.html file

        divTag.innerHTML = `<ul>
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn" >Like <3</button>
        </ul>` + divTag.innerHTML
        // append to the end
        // adding += after first divTag.innerHTML will prepend to the top
      })
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// 3. Increase Toy's likes
// conditionally increases the toy's like count
// need to send a PATCH request
document.addEventListener('click', function(e){
  if(e.target.tagName === 'BUTTON' && e.target.className === "like-btn") {
    let like = e.target.parentElement.children[2]
    let count = parseInt(like.innerText.split(" ")[0],10)
    count += 1

    like.innerText = `${count} likes`


    fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'applcation/json'
      },
      body: JSON.stringify({
        'likes': count
      })
    })
  }
})
