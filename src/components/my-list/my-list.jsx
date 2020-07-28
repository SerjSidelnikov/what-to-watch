import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Logo from '../logo/logo';
import UserBlock from '../../user-block/user-block';
import CardList from '../card-list/card-list';
import Footer from '../footer/footer';
import {getFavoriteFilms} from '../../reducers/data/selectors';
import {filmType} from '../../types';
import {Operation} from '../../reducers/data/data';

class MyList extends React.PureComponent {
  componentDidMount() {
    const {loadFavoriteFilms} = this.props;
    loadFavoriteFilms();
  }

  render() {
    let {films} = this.props;
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo/>

          <h1 className="page-title user-page__title">My list</h1>

          <UserBlock/>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          {films.length && <CardList films={films}/>}
        </section>

        <Footer/>
      </div>
    );
  }
}

MyList.propTypes = {
  films: PropTypes.arrayOf(filmType),
  loadFavoriteFilms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: getFavoriteFilms(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteFilms: () => {
    dispatch(Operation.loadFavoriteFilms());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
