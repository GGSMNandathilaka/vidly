import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/list-group";
import Paginator from "./common/paginator";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    currentPage: 1,
    limit: 4,
    currentGenre: "all_genres",
    sortColumn: { path: "title", order: "asc" },
    movies: [],
    genres: [],
  };

  componentDidUpdate(prevProps, prevState) {}

  componentDidMount() {
    const genres = [{ _id: "all_genres", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
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
    this.setState({ currentGenre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData() {
    const { movies, currentPage, limit, currentGenre, sortColumn } = this.state;

    let filteredMovies =
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
    } = this.state;

    const { totalCount, data: displayedMovies } = this.getPagedData();

    if (movies && movies.length === 0)
      return <p>There are no movies in the database</p>;
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
            <p>Showing {totalCount} movies in the database</p>
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

  handleDeleteMovies = (id) => {
    const movies = this.state.movies.filter((movie) => movie._id !== id);
    this.setState({ movies });
  };
}
export default Movies;
