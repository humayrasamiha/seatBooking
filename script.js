const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
    const selectSeats = document.querySelectorAll('.row .seat.selected');

    // Copy selected seats into arr
    // Map through arr
    // Return a new arr indexes

    const seatsIndex = [...selectSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectSeats', JSON.stringify(seatsIndex));

    const selectSeatsCount = selectSeats.length;
    count.innerText = selectSeatsCount;
    total.innerText = selectSeatsCount * ticketPrice;

}

// Get data form localstorage and populate UI
function populateUI() {
    const selectSeats = JSON.parse(localStorage.getItem('selectSeats'));

    if (selectSeats !== null && selectSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}
// Movie select events
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click events
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

// Initial count and total set
updateSelectedCount();