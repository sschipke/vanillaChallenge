class Ticket {
  constructor(ticket) {
    this.title= ticket.title;
    this.theater = ticket.theater;
    this.description= ticket.description;
    this.category= ticket.category
    this.id = ticket.id || Date.now()
  }

}