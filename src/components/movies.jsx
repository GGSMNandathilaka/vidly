import React, { Component } from "react";
import { toast } from "react-toastify";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/list-group";
import Paginator from "./common/paginator";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    currentPage: 1,
    limit: 4,
    currentGenre: "all_genres",
    sortColumn: { path: "title", order: "asc" },
    movies: [],
    genres: [],
    searchQuery: "",
  };

  componentDidUpdate(prevProps, prevState) {}

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "all_genres", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  handlePageClicked = (currentPage) => {
    this.setState({ currentPage });
  };

  handleGenreSelected = (currentGenre) => {
    this.setState({ currentGenre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ currentGenre: null, searchQuery: query, currentPage: 1 });
  };

  handleDeleteMovies = async (id) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== id);
    this.setState({ movies });

    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
  };

  getPagedData() {
    const {
      movies,
      currentPage,
      limit,
      currentGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filteredMovies = movies;

    if (searchQuery)
      filteredMovies = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery)
      );
    else if (currentGenre)
      filteredMovies =
        currentGenre && currentGenre !== "all_genres"
          ? movies.filter((m) => m.genre._id === currentGenre)
          : movies;

    let sortedList = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const displayedMovies = paginate(sortedList, currentPage, limit);

    return { totalCount: filteredMovies.length, data: displayedMovies };
  }

  render() {
    const {
      movies,
      currentPage,
      limit,
      currentGenre,
      sortColumn,
      genres,
      searchQuery,
    } = this.state;

    const { totalCount, data: displayedMovies } = this.getPagedData();

    return (
      <main className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              genres={genres}
              currentGenre={currentGenre}
              onGenreSelected={this.handleGenreSelected}
            />
          </div>
          <div className="col">
            <Link to="/movies/new" className="btn btn-primary bottom-padding">
              New Movie
            </Link>
            <p>
              <strong>Showing {totalCount} movies in the database</strong>
            </p>

            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={displayedMovies}
              onLike={this.handleLike}
              sortColumn={sortColumn}
              onDelete={this.handleDeleteMovies}
              onSort={this.handleSort}
            />
            <Paginator
              itemsCount={totalCount}
              limit={limit}
              currentPage={currentPage}
              onPageClicked={this.handlePageClicked}
            />
          </div>
        </div>
      </main>
    );
  }
}
export default Movies;
