document.addEventListener("DOMContentLoaded", () => {
    // Get the element with class "filmin"
    const myfilm = document.querySelector(".filmin");
  
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
      const list = document.createElement("li");
      list.id ="movied"
      const title = document.createElement("p");
      title.id = "run"
      title.textContent = `${movie.title}`;
      
      list.appendChild(title);
  
      const runtime = document.createElement("p");
      runtime.textContent = `Runtime: ${movie.runtime} minutes`;
      list.appendChild(runtime);
      runtime.classList = 'watch'
      const capacity = document.createElement("p");
      capacity.textContent = `Capacity: ${movie.capacity}`;
      list.appendChild(capacity);
      capacity.classList = 'watch'
      const showtime = document.createElement("p");
      showtime.textContent = `Showtime: ${movie.showtime}`;
      list.appendChild(showtime);
      showtime.classList = 'watch'
      const ticketsSold = document.createElement("p");
      ticketsSold.textContent = `Tickets Sold: ${movie.tickets_sold}`;
      list.appendChild(ticketsSold);
      ticketsSold.classList = 'watch'
      const mybutton = document.createElement("button");
      mybutton.id = "james";
      mybutton.textContent = "Buy Ticket";
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
      description.id = "filmed"
      description.classList = 'watch'
      description.textContent = `Description: ${movie.description}`;

      list.appendChild(description);
  
      const poster = document.createElement("img");
      poster.id = "pic"
    
      poster.src = movie.poster;
      list.appendChild(poster);
  
      myfilm.appendChild(list);
    }
  
    // Buy ticket for a movie
    function buyTicket(movieId) {
      return fetch(`http://localhost:3000/films/${movieId}/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(resp => resp.json())
        .then(updatedMovie => {
          return updatedMovie;
        });
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
      movieElements[0].click();
    });
  });
  