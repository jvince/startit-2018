var App = (function (axios) {
	var movieTpl = document.getElementById('movie-template').innerHTML;
	var $movie = document.getElementById('movie');

	function getRandomMovie(movies) {
		return movies[_.random(0, movies.length - 1)];
	}

	function attachEvents() {
		document.addEventListener('dragstart', function (e) {
			if (
				e.target instanceof HTMLElement &&
				e.target.getAttribute('id') === 'movie'
			) {
				var movieId = e.target.children[0].getAttribute('data-movie-id');
				e.target.classList.add('dragging');
				e.dataTransfer.setData('movieId', movieId);
				return;
			}

			e.preventDefault();
		});

		document.addEventListener('dragend', function (e) {
			e.target.classList.remove('dragging');
		});
	}

	return {
		start: function () {
			axios.get('db.json')
			.then(function (response) {
				var movie = getRandomMovie(response.data.movies);

				$movie.innerHTML = Mustache.render(movieTpl, {
					id: movie.id,
					posterUrl: movie.posterUrl
				});

				attachEvents();
			});
		}
	}
})(axios);