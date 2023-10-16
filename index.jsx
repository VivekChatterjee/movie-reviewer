let movieName = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");


// fetching data from api

let getMovie = () => {
  let movie = movieName.value;
  let url = `https://www.omdbapi.com/?t=${movie}&apikey=${key}`;

  if (movie.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
  } else {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.Response == "True") {
          result.innerHTML = `
            <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                                <span>${data.Country}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join(
                                  "</div><div>"
                                )}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
          `;
        } else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">An Error Occured !!</h3>`;
      });
  }
};



searchBtn.addEventListener("click", getMovie);

// adding enter key press feature
movieName.addEventListener("keyup", (e)=> {

  if (e.keyCode === 13) {
   
   e.preventDefault()
   getMovie()
  }
});


