import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { deleteMovie } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = movieId => {
    deleteMovie(movieId.id);
    this.setState({ movies: getMovies() });
  };

  render() {
    return (
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div>{this.formatMovieCountText()}</div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map(movie => (
                <tr key={movie._id}>
                  <td
                    className="font-weight-normal"
                    key={movie._id + "_" + movie.title}
                  >
                    {movie.title}
                  </td>
                  <td
                    className="font-weight-normal"
                    key={movie._id + "_" + movie.genre.name}
                  >
                    {movie.genre.name}
                  </td>
                  <td
                    className="font-weight-normal"
                    key={movie._id + "_" + movie.numberInStock}
                  >
                    {movie.numberInStock}
                  </td>
                  <td
                    className="font-weight-normal"
                    key={movie._id + "_" + movie.dailyRentalRate}
                  >
                    {movie.dailyRentalRate}
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete({ id: movie._id })}
                      className="btn btn-secondary btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  formatMovieCountText() {
    const { movies } = this.state;
    return movies.length === 0 ? (
      <p className="font-weight-bold">There are no movies in the database</p>
    ) : (
      <p className="font-weight-bold">
        Showing {movies.length} movies in the database
      </p>
    );
  }
}

export default Movies;
