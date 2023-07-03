function fetchMovieData() {
    return fetch("http://localhost:3000/films")
      .then(resp => resp.json())
      .then(films => {
        let ul = document.getElementById("uls");
        let li = [];

        for(let i= 0; i < films.length; i++){
            li.push(`<li>${films[i].title}</li>`);

        }

        let u = document.getElementById("uls")
        u.addEventListener("click", ()=>{
            getMoviebyid(3);
        })

        console.log(li);

        // li.forEach((a) => {
        //     console.log(
        //     a.addEventListener("mouseover", () => {

        //     })
        // })

        ul.innerHTML = li;

      })
      .catch(error => {
        console.error("Error fetching movie data:", error);
      });
}


function getMoviebyid(id){
    fetch(`http://localhost:3000/films/${id}`)
    .then(resp => resp.json())
    .then(film => {
        displayMovieData(film)
    })
    .catch(error => {
      console.error("Error fetching movie data:", error);
    });
}


function fetchOneMovie(){
    return fetch("http://localhost:3000/films/1")
    .then(resp => resp.json())
    .then(film => {
        displayMovieData(film)
    })
    .catch(error => {
      console.error("Error fetching movie data:", error);
    });
}

function displayMovieData(movie, movieElement) {
    const filminContainer = document.querySelector(".filmin");

    const list = document.createElement("li");
    list.id = "movied";

    const title = document.createElement("p");
    title.id = "run";
    title.textContent = `${movie.title}`;
    list.appendChild(title);

    const runtime = document.createElement("p");
    runtime.textContent = `Runtime: ${movie.runtime} minutes`;
    list.appendChild(runtime);
    runtime.classList = 'watch';

    const capacity = document.createElement("p");
    capacity.textContent = `Capacity: ${movie.capacity}`;
    list.appendChild(capacity);
    capacity.classList = 'watch';

    const showtime = document.createElement("p");
    showtime.textContent = `Showtime: ${movie.showtime}`;
    list.appendChild(showtime);
    showtime.classList = 'watch';

    const ticketsSold = document.createElement("p");
    ticketsSold.textContent = `Tickets Sold: ${movie.tickets_sold}`;
    list.appendChild(ticketsSold);
    ticketsSold.classList = 'watch';

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
    description.id = "filmed";
    description.classList = 'watch';
    description.textContent = `Description: ${movie.description}`;
    list.appendChild(description);

    const poster = document.createElement("img");
    poster.id = "pic";
    poster.src = movie.poster;
    list.appendChild(poster);

    // Append the new movie element to the filminContainer
    filminContainer.appendChild(list);
  }




fetchOneMovie();

  fetchMovieData();