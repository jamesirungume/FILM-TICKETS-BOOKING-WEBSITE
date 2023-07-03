document.addEventListener("DOMContentLoaded", () => {
  // Get the element with class "filmin"
  const filminContainer = document.querySelector(".filmin");

  // Keep track of the currently displayed movie
  let currentMovie = null;

  // Fetch movie data from the server
  function fetchMovieData() {
    return fetch("http://localhost:3000/films")
      .then(resp => resp.json())
      .catch(error => {
        console.error("Error fetching movie data:", error);
      });
  }

  // Display movie data in the DOM
  function displayMovieData(movie) {
    const movieDetails = document.getElementById("movied");

    if (movieDetails) {
      // Update the movie details
      movieDetails.querySelector("#run").textContent = movie.title;
      movieDetails.querySelector(".watch-runtime").textContent = `Runtime: ${movie.runtime} minutes`;
      movieDetails.querySelector(".watch-capacity").textContent = `Capacity: ${movie.capacity}`;
      movieDetails.querySelector(".watch-showtime").textContent = `Showtime: ${movie.showtime}`;
      movieDetails.querySelector(".watch-tickets-sold").textContent = `Tickets Sold: ${movie.tickets_sold}`;
      movieDetails.querySelector("#james").disabled = movie.tickets_sold === movie.capacity;
      movieDetails.querySelector("#james").textContent = movie.tickets_sold === movie.capacity ? "Sold Out" : "Buy Ticket";
      movieDetails.querySelector(".watch-description").textContent = `Description: ${movie.description}`;
      movieDetails.querySelector("#pic").src = movie.poster;
    } else {
      // Create the movie details element
      const list = document.createElement("li");
      list.id = "movied";

      const title = document.createElement("p");
      title.id = "run";
      title.textContent = `${movie.title}`;
      list.appendChild(title);

      const runtime = document.createElement("p");
      runtime.textContent = `Runtime: ${movie.runtime} minutes`;
      list.appendChild(runtime);
      runtime.classList = 'watch watch-runtime';

      const capacity = document.createElement("p");
      capacity.textContent = `Capacity: ${movie.capacity}`;
      list.appendChild(capacity);
      capacity.classList = 'watch watch-capacity';

      const showtime = document.createElement("p");
      showtime.textContent = `Showtime: ${movie.showtime}`;
      list.appendChild(showtime);
      showtime.classList = 'watch watch-showtime';

      const ticketsSold = document.createElement("p");
      ticketsSold.textContent = `Tickets Sold: ${movie.tickets_sold}`;
      list.appendChild(ticketsSold);
      ticketsSold.classList = 'watch watch-tickets-sold';

      const mybutton = document.createElement("button");
      mybutton.id = "james";
      mybutton.textContent = movie.tickets_sold === movie.capacity ? "Sold Out" : "Buy Ticket";
      mybutton.addEventListener("click", () => {
        // Increment ticket sales if capacity is not reached
        if (movie.tickets_sold < movie.capacity) {
          movie.tickets_sold++;
          ticketsSold.textContent = `Tickets Sold: ${movie.tickets_sold}`;

          // Disable button and update text if sold out
          if (movie.tickets_sold === movie.capacity) {
            mybutton.disabled = true;
            mybutton.textContent = "Sold Out";
          }
        }
      });
      list.appendChild(mybutton);

      const description = document.createElement("p");
      description.classList = 'watch watch-description';
      description.textContent = `Description: ${movie.description}`;
      list.appendChild(description);

      const poster = document.createElement("img");
      poster.id = "pic";
      poster.src = movie.poster;
      list.appendChild(poster);

      // Append the new movie details element to the filminContainer
      filminContainer.appendChild(list);
    }
  }

  // Fetch movie data and handle click events
  fetchMovieData().then(movies => {
    const movieElements = document.querySelectorAll(".otherMovies > div");

    movieElements.forEach((movieElement, index) => {
      movieElement.addEventListener("click", () => {
        const movie = movies[index];
        displayMovieData(movie);
      });
    });

    // Display the first movie initially
    movieElements[0].click();
  });
});
