import * as React from 'react';
import {connect} from 'react-redux';

import Logo from '../logo/logo';
import Footer from '../footer/footer';
import {Operation} from '../../reducers/user/user';
import {getError} from '../../reducers/user/selectors';

interface DataUser {
  login: string,
  password: string,
}

interface Props {
  onSubmit: ({login, password}: DataUser) => void,
  error: boolean,
}

class SignIn extends React.PureComponent<Props, null> {
  private loginRef: React.RefObject<HTMLInputElement>;
  private passwordRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.loginRef = React.createRef();
    this.passwordRef = React.createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(evt) {
    const {onSubmit} = this.props;
    evt.preventDefault();
    onSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    const {error} = this.props;

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo/>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form className="sign-in__form" onSubmit={this._handleSubmit}>
            {error && <div className="sign-in__message">
              <p>Please enter a valid email address</p>
            </div>}
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  ref={this.loginRef}
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"/>
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input
                  ref={this.passwordRef}
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"/>
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (authData) => {
    dispatch(Operation.login(authData));
  },
});

export {SignIn};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
