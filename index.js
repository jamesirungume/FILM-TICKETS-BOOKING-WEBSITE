document.addEventListener("DOMContentLoaded", () => {
    const myfilm = document.querySelector(".filmin");

    function fetchMovieData() {
        return fetch("http://localhost:3000/films")
            .then(resp => resp.json())
            .then(movies => {
                return movies;
            })
            .catch(error => {
                console.error("Error fetching movie data:", error);
            });
    }

    function displayMovieData(movie) {
        const list = document.createElement("li");
    const title =document.createElement("p")
    title.textContent = `${movie.title}`
    list.appendChild(title)
       
    const runtime = document.createElement("p");
    runtime.textContent = `Runtime: ${movie.runtime} minutes`;
    list.appendChild(runtime);

    const capacity = document.createElement("p");
    capacity.textContent = `Capacity: ${movie.capacity}`;
    list.appendChild(capacity);

    const showtime = document.createElement("p");
    showtime.textContent = `Showtime: ${movie.showtime}`;
    list.appendChild(showtime);

    const ticketsSold = document.createElement("p");
    ticketsSold.textContent = `Tickets Sold: ${movie.tickets_sold}`;
    list.appendChild(ticketsSold);

    const description = document.createElement("p");
    description.textContent = `Description: ${movie.description}`;
    list.appendChild(description);

    const poster = document.createElement("img");
    poster.src = movie.poster;
    list.appendChild(poster);
        myfilm.appendChild(list);
    }

    fetchMovieData().then(movies => {
        const movieElements = document.querySelectorAll(".otherMovies > div");
        movieElements.forEach((movieElement, index) => {
            movieElement.addEventListener("click", () => {
                const movie = movies[index];
                displayMovieData(movie);
            });
        });
    });
});
