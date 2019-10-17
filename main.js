

//query selectors
const titleInput = document.getElementById('title');
const theaterInput = document.getElementById('theater');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category-select');
const addButton = document.getElementById('add-btn');
const stage = document.querySelector('main')

//event Listeners

addButton.addEventListener('click', handleSubmit)

// Variables

var allTickets = [];

//functions

function handleSubmit() {
  insatiateTicket()
}

function insatiateTicket() {
  let title = titleInput.value;
  let theater = theaterInput.value;
  let description = descriptionInput.value;
  let category= categoryInput.value;
  let newTicket = new Ticket({title, theater, description, category})
  allTickets.push(newTicket)
  displayTicket(newTicket)
  console.log(allTickets)
}

function displayTicket(ticket) {
  stage.insertAdjacentHTML('afterbegin', `<div class="ticket">
        <h2>Title: ${ticket.title}</h2>
        <h3>Theater: ${ticket.theater}</h3>
        <p>${ticket.description}</p>
        <footer>
          <h4>${ticket.category}</h4>
          <button type="button" id=${ticket.id}>Nevermind</button>
        </footer>
      </div>`)
}

