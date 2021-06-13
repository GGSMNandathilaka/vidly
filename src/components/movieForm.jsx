import React from "react";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import {
  getMovies,
  getMovie,
  updateMovie,
  createMovie,
} from "../services/movieService";

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
    genres: [],
    movieId: "",
  };

  async componentDidMount() {
    await this.populateGenre();
    await this.populateMovie();
  }

  async populateGenre() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      this.setState({ movieId });
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/page-not-found");
    }
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genre: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  mapToModelView(movie) {
    return {
      title: movie.title,
      genreId: movie.genre,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  schema = {
    _id: Joi.string().allow(""),
    liked: Joi.boolean(),
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  };

  doSubmit = async () => {
    // save movie in the DB
    try {
      const updatedMovie = this.mapToModelView(this.state.data);
      if (this.state.movieId === "new") {
        const { data } = await createMovie(updatedMovie);
        toast.success(`Create a new movie: ${data._id}`);
      } else {
        const { data } = await updateMovie(this.state.data._id, updatedMovie);
        toast.success(`Updated a movie: ${data._id}`);
      }
    } catch (ex) {
      if (ex.response) toast.error("Error with saving a movie");
    }

    // redirect to movies page
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropdown("genre", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
