import React from "react";

const ListGroup = (props) => {
  const { genres, currentGenre, textProperty, onGenreSelected } = props;
  return (
    <ul className="list-group">
      {genres.map((g) => (
        <li
          key={g[textProperty]}
          className={
            g._id === currentGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onGenreSelected(g._id)}
        >
          {g[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
