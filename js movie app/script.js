// const submit = document.querySelector(".search-button");
// const search = document.querySelector(".search-box");
// const movieContainer = document.getElementById("movieResults");

// const getMovieInfo = (movie) => {
//   const apiKey = "6677590c";
//   const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;
//   fetch(url)
//     .then((response) => response.json()) // Convert response to JSON
//     .then((data) => console.log(data)) // Use the JSON data
//     .catch((error) => console.error("Error:", error));
// };

// submit.addEventListener("click", (e) => {
//   // e.preventDefult();
//   // console.log(search.value);
//   // search.value = ''
//   const movieName = search.value.trim();
//   if (movieName !== "") {
//     getMovieInfo(movieName);
//   }
// });

const submit = document.querySelector(".search-button");
const search = document.querySelector(".search-box");
const movieContainer = document.getElementById("movieResults");

const getMovieInfo = (movie) => {
  const apiKey = "6677590c";
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;
  fetch(url)
    .then((response) => response.json()) // Convert response to JSON
    .then((data) => {
      if (data.Response === "True") {
        // If movie is found, display its details
        displayMovieInfo(data);
      } else {
        // If movie not found, show an error message
        movieContainer.innerHTML = `<p class="error-message">Movie not found. Please try another search.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      movieContainer.innerHTML = `<p class="error-message">An error occurred while fetching movie details. Please try again.</p>`;
    });
};

const displayMovieInfo = (movieData) => {
  // Clear any previous results
  movieContainer.innerHTML = "";

  // Create a card for the movie
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  // Add the movie details to the card
  movieCard.innerHTML = `
    <img src="${movieData.Poster}" alt="${movieData.Title} Poster" class="movie-poster">
    <div class="movie-details">
      <h2 class="movie-title">${movieData.Title}</h2>
      <p><strong>Released:</strong> ${movieData.Released}</p>
      <p><strong>Writer:</strong> ${movieData.Writer}</p>
      <p><strong>Plot:</strong> ${movieData.Plot}</p>
    </div>
  `;

  // Append the movie card to the container
  movieContainer.appendChild(movieCard);
};

// Event listener for the search button
submit.addEventListener("click", (e) => {
  e.preventDefault();
  const movieName = search.value.trim();
  if (movieName !== "") {
    getMovieInfo(movieName);
    search.value = ""; // Clear the input field after search
  }
});

