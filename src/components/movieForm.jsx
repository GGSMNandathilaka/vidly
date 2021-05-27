import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovies, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
      liked: false,
    },
    errors: {},
  };

  componentDidMount() {
    // check current path contains a valid movie id
    const movies = getMovies();
    const isValidId = movies.some((m) => m._id === this.props.match.params.id);

    if (isValidId) {
      const movie = this.props.location.state;
      if (movie && movie.genre && movie.genre._id) {
        movie.genre = movie.genre._id;
      }
      const data =
        this.props.match.path === "/movies/:id" ? movie : this.state.data;
      this.setState({ data });
    } else {
      this.props.history.push("/page-not-found");
    }
  }

  schema = {
    _id: Joi.string().allow(""),
    liked: Joi.boolean(),
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  };

  doSubmit = () => {
    // save movie in the DB
    saveMovie(this.state.data);

    // redirect to movies page
    this.props.history.push("/movies");
  };

  render() {
    const genres = getGenres();
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropdown("genre", "Genre", genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
