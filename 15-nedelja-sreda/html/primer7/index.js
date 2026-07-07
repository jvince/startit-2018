var App = (function (axios, Mustache) {
	var genres = [];
	var movies = [];

	var $genres = document.getElementById('genres');
	var $movies = document.getElementById('movies');

	var genresTpl = document.getElementById('genres-template').innerHTML;
	var moviesTemplate = document.getElementById('movies-template').innerHTML;

	return {
		getCurrentGenre: function () {
		},
		getMoviesByGenre: function () {
		},
		start: function () {
			var self = this;

			this.attachEvents();
			this.fetch()
			.then(function (response) {
				var data = response.data;
				genres = data.genres;
				movies = data.movies;

				self.createLinks();
			});
		},
		fetch: function (cb) {
			return axios.get('db.json');
		},
		createLinks: function () {
			$genres.innerHTML = Mustache.render(genresTpl, {
				genres: genres
			});
		},
		updateMovies: function () {
			// TODO: compile movies template;
		},
		attachEvents: function () {
			window.addEventListener('hashchange', this.updateMovies.bind(this));
		}
	}
})(axios, Mustache);