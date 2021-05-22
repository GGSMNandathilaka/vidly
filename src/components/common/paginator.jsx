import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Paginator = (props) => {
  const { itemsCount, limit, currentPage, onPageClicked } = props;
  const pagesCount = Math.ceil(itemsCount / limit);
  if (pagesCount === 1) return null;
  const pagesArray = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="...">
      <ul className="pagination">
        {pagesArray.map((p) => (
          <li
            key={p}
            className={p === currentPage ? "page-item active" : "page-item"}
          >
            <span onClick={() => onPageClicked(p)} className="page-link">
              {p}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Paginator.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageClicked: PropTypes.func.isRequired,
};

export default Paginator;
