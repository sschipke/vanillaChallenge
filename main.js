

//query selectors
const titleInput = document.getElementById('title');
const theaterInput = document.getElementById('theater');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category-select');
const addButton = document.getElementById('add-btn');
const mainForm = document.querySelector('form')
const stage = document.querySelector('section');

//event Listeners
window.addEventListener('load', handlePageLoad)
addButton.addEventListener('click', handleSubmit);
mainForm.addEventListener('keyup', toggleButton)
stage.addEventListener('click', handleTicketClicks)

// Variables

var allTickets = [];

//functions

function handlePageLoad() {
  checkStorage()
}

function handleSubmit() {
  insatiateTicket()
  emptyInputs()
  toggleButton()
}

function handleTicketClicks(e) {
  deleteTicket(e)
  updateFavorite(e)
}

function toggleButton() {
  if(!titleInput.value||!theaterInput.value||!descriptionInput.value) {
    addButton.disabled = true;
  } else {
    addButton.disabled = false;
  }
}

function emptyInputs() {
  titleInput.value = "";
  theaterInput.value = "";
  descriptionInput.value = "";
}

function saveToStorage() {
  localStorage.setItem('tickets', JSON.stringify(allTickets))
}

function insatiateTicket() {
  let title = titleInput.value;
  let theater = theaterInput.value;
  let description = descriptionInput.value;
  let category= categoryInput.value;
  let newTicket = new Ticket({title, theater, description, category})
  allTickets.push(newTicket)
  displayTicket(newTicket)
  saveToStorage()
}

function displayTicket(ticket) {
  stage.insertAdjacentHTML('afterbegin', `<div class="ticket">
        <h2>Title: ${ticket.title}</h2>
        <h3>Theater: ${ticket.theater}</h3>
        <p>${ticket.description}</p>
        <h4>${ticket.category}</h4>
        <footer>
        <button type="button" id=${ticket.id} class="fave-button">  </button>
          <button type="button" class="delete-button" id=${ticket.id}> X </button>
        </footer>
      </div>`)
}

function deleteTicket(e) {
  if(e.target.classList.contains('delete-button')) {
    let id = parseInt(e.target.id)
    allTickets = allTickets.filter(ticket => ticket.id !== id)
    e.target.closest('.ticket').remove()
    saveToStorage()
  }
}

function displayManyTickets(tickets) {
  tickets.forEach(ticket => {
    displayTicket(ticket)
  })
}

function checkStorage() {
  if(JSON.parse(localStorage.getItem('tickets'))) {
    allTickets = JSON.parse(localStorage.getItem('tickets'));
    allTickets = allTickets.map(ticket => new Ticket(ticket))
    displayManyTickets(allTickets)
  } else {
    allTickets = []
  }
}

function updateFavorite(e) {
  if(e.target.classList.contains('fave-button')) {
    e.target.closest('.ticket').classList.toggle('favorite')
    console.log()
    let id = parseInt(e.target.id)
    allTickets.find(ticket => ticket.id === id).toggleFavorite()
    saveToStorage()
  }
}


