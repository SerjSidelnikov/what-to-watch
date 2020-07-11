import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
  const {name, onMouseEnter, onMouseLeave, children} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="small-movie-card__image">
        {children}
      </div>
      <h3 className="small-movie-card__title">
        <a
          className="small-movie-card__link"
          href="#"
        >{name}</a>
      </h3>
    </article>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Card;
