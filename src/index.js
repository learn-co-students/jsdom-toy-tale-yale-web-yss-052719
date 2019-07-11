const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyColl = document.querySelector('#toy-collection')
let addToy = false

document.addEventListener('DOMContentLoaded', function(){
	fetch('http://localhost:3000/toys')
	.then(response => response.json())
	.then(toys => {
		for (let i = 0; i < toys.length; i++){
			newDiv = document.createElement("div")
			newDiv.className = "card"
			newDiv.innerHTML = `<h2>${toys[i].name}</h2>
    							<img src="${toys[i].image}"" class="toy-avatar" />
    							<p>${toys[i].likes} Likes </p>
    							<button class="like-btn" data-id=${toys[i].id}>Like <3</button>
    							<button class="del-btn" data-id=${toys[i].id}>Murder Toy</button>`
    		toyColl.append(newDiv)
		}
	})
})

document.querySelector('form').addEventListener('submit', function(e){
	e.preventDefault()

	const name = e.target.children[1].value
	const imgUrl = e.target.children[3].value

	fetch("http://localhost:3000/toys",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "name": name,
          "image": imgUrl,
          "likes": 0
        })
      }).then(res => res.json())
	.then(data => {
		newDiv = document.createElement("div")
		newDiv.className = "card"
		newDiv.innerHTML = `<h2>${name}</h2>
							<img src="${imgUrl}"" class="toy-avatar" />
							<p>0 Likes </p>
							<button class="like-btn">Like <3</button>`
		toyColl.append(newDiv)		
	})
})

document.addEventListener('click', function(e){
	if(e.target.className === "like-btn"){
		let likeEl = e.target.parentElement.children[2]
		let likeCount = parseInt(likeEl.innerText.split(" ")[0], 10)
		likeCount += 1

		likeEl.innerText = `${likeCount} Likes`
		
		fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
			method: "PATCH",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				likes: likeCount
			})
		})
	} else if (e.target.className === "del-btn"){
		console.log("This toy has died a terrible death!")
		fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
			method: "DELETE"
		})
		.then(data => {
			e.target.parentElement.remove()
		})
	}
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
