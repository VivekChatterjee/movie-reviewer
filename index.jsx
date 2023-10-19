let movieName = document.getElementById('movie-name');
let searchBtn = document.getElementById('search-btn');
let result = document.getElementById('result');
let container = document.querySelector('.container')
let loader = document.querySelector('.loader')
// fetching data from api

let getMovie = () => {
	let movie = movieName.value;
	let url = `https://www.omdbapi.com/?t=${movie}&apikey=${key}`;

	if (movie.length <= 0) {
		result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
	} else {
    container.classList.add('make-darker')
    loader.classList.remove('hidden')
		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
        container.classList.remove('make-darker')
        loader.classList.add('hidden')
				if (data.Response == 'True') {
					result.innerHTML = `
              <div class="info">
                <img src="${data?.Poster}" class="poster">
                <div class='info-left'>
                <div class='title-container'>
                    <h2>${data?.Title}</h2>
                    <div class="rating">
                      <h4>${data?.Rated}</h4>|
                      <h4>${data?.Year}</h4>|
                      <h4>${data?.Runtime}</h4>|
                      <img src="star-icon.svg">
                      <h4>${data?.imdbRating}</h4>
                    </div>
                  </div>
                  <div class='details-container'>
                  <h3>${data?.Genre.split(',').length > 1 ? 'Genres' : 'Genre'} :</h3>
                  <div class="genre">
                  <div>${data.Genre.split(',').join('</div><div>')}</div>
                  </div>
                </div>
                <div class='details-container'>
                  <h3>${data?.Country.split(',').length > 1 ? 'Countries' : 'Country'} :</h3>
                  <div class="details">
                    ${data?.Country.split(',').join(',')}

                  </div>
                </div>
                </div>
              </div>

              <div class='details-container'>
                <h3>Plot :</h3>
                <p>${data?.Plot}</p>
              </div>
              <div class='details-container'>
                <h3>Cast :</h3>
                <p>${data?.Actors}</p>
              </div>
            `;
				} else {
					result.innerHTML = `<h3 class="msg">${data?.Error}</h3>`;
				}
			})
			.catch(() => {
        container.classList.remove('make-darker')
        loader.classList.add('hidden')
				result.innerHTML = `<h3 class="msg">An Error Occured !!</h3>`;
			});
	}
};

searchBtn.addEventListener('click', function(){
  getMovie();
  movieName.value = "";

});



// adding enter key press feature
movieName.addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		e.preventDefault();
		getMovie();
    movieName.value = "";
	}
});
