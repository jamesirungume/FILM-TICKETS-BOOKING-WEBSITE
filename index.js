document.addEventListener("DOMContentLoaded", () => {
  // Select the container element for movie details
  const filminContainer = document.querySelector(".filmin");

  // Fetch movie data from the server
  function fetchMovieData() {
    return fetch("http://localhost:3000/films")
      .then(resp => resp.json())
      .catch(error => {
        console.error("Error fetching movie data:", error);
      });
  }

  // Display movie details in the DOM
  function displayMovieData(movie) {
    const movieDetails = document.getElementById("movied");

    if (movieDetails) {
      // If movie details exist, update the content
      movieDetails.innerHTML = `
        <p id="run">${movie.title}</p>
        <p class="watch watch-runtime">Runtime: ${movie.runtime} minutes</p>
        <p class="watch watch-capacity">Capacity: ${movie.capacity}</p>
        <p class="watch watch-showtime">Showtime: ${movie.showtime}</p>
        <p class="watch watch-tickets-sold">Tickets Sold: ${movie.tickets_sold}</p>
        <button id="james" ${movie.tickets_sold === movie.capacity ? 'disabled' : ''}>
          ${movie.tickets_sold === movie.capacity ? 'Sold Out' : 'Buy Ticket'}
        </button>
        <p class="watch watch-description" id="watching">Description: ${movie.description}</p>
        <img id="pic" src="${movie.poster}">
      `;
    } else {
      // If movie details don't exist, create a new element and append it to the container
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
        <p class="watch watch-description" id="watching">Description: ${movie.description}</p>
        <img id="pic" src="${movie.poster}">
      `;
      filminContainer.appendChild(list);
    }
  }

  // Handle button click event for buying tickets
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

  // Fetch movie data and attach event listeners to movie elements
  fetchMovieData().then(movies => {
    const movieElements = document.querySelectorAll(".otherMovies > div");

    movieElements.forEach((movieElement, index) => {
      movieElement.addEventListener("click", () => {
        const movie = movies[index];
        displayMovieData(movie); // Display the selected movie's details
        handleButtonClick(movie); // Attach button click event listener
      });
    });

    movieElements[0].click(); // Simulate click on the first movie element
  });
});
