document.addEventListener("DOMContentLoaded", () => {
  const filminContainer = document.querySelector(".filmin");

  function fetchMovieData() {
    return fetch("http://localhost:3000/films")
      .then(resp => resp.json())
      .catch(error => {
        console.error("Error fetching movie data:", error);
      });
  }

  function displayMovieData(movie) {
    const movieDetails = document.getElementById("movied");

    if (movieDetails) {
      movieDetails.innerHTML = `
        <p id="run">${movie.title}</p>
        <p class="watch watch-runtime">Runtime: ${movie.runtime} minutes</p>
        <p class="watch watch-capacity">Capacity: ${movie.capacity}</p>
        <p class="watch watch-showtime">Showtime: ${movie.showtime}</p>
        <p class="watch watch-tickets-sold">Tickets Sold: ${movie.tickets_sold}</p>
        <button id="james" ${movie.tickets_sold === movie.capacity ? 'disabled' : ''}>
          ${movie.tickets_sold === movie.capacity ? 'Sold Out' : 'Buy Ticket'}
        </button>
        <p class="watch watch-description" id = "watching">Description: ${movie.description}</p>
        <img id="pic" src="${movie.poster}">
      `;
    } else {
      const list = document.createElement("li");
      list.id = "movied";
      list.innerHTML = `
        <p id="run">${movie.title}</p>
        <p class="watch watch-runtime">Runtime: ${movie.runtime} minutes</p>
        <p class="watch watch-capacity">Capacity: ${movie.capacity}</p>
        <p class="watch watch-showtime">Showtime: ${movie.showtime}</p>
        <p class="watch watch-tickets-sold">Tickets Sold: ${movie.tickets_sold}</p>
        <button id="james" ${movie.tickets_sold === movie.capacity ? 'disabled' : ''}>
          ${movie.tickets_sold === movie.capacity ? 'Sold Out' : 'Buy Ticket'}
        </button>
        <p class="watch watch-description"id = "watching" >Description: ${movie.description}</p>
        <img id="pic" src="${movie.poster}">
      `;
      filminContainer.appendChild(list);
    }
  }

  function handleButtonClick(movie) {
    const button = document.getElementById("james");
    const ticketsSoldElement = document.querySelector(".watch-tickets-sold");

    button.addEventListener("click", () => {
      if (movie.tickets_sold < movie.capacity) {
        movie.tickets_sold++;
        ticketsSoldElement.textContent = `Tickets Sold: ${movie.tickets_sold}`;

        if (movie.tickets_sold === movie.capacity) {
          button.disabled = true;
          button.textContent = "Sold Out";
        }
      }
    });
  }

  fetchMovieData().then(movies => {
    const movieElements = document.querySelectorAll(".otherMovies > div");

    movieElements.forEach((movieElement, index) => {
      movieElement.addEventListener("click", () => {
        const movie = movies[index];
        displayMovieData(movie);
        handleButtonClick(movie); // Attach button click event listener
      });
    });

    movieElements[0].click();
  });
});
