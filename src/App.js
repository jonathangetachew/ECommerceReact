import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPages from "./pages/signin-and-signup/signin-and-signup.component";
import CheckoutPage from "./pages/checkout/checkout.components";

import Header from "./components/header/header.component";

import {
  auth,
  createUserProfileDocument
  // addCollectionAndDocuments
} from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
// import { selectCollectionsForPreview } from "./redux/shop/shop.selector";

class App extends React.Component {
  ///> To logout on component uhmount to avoid memory leak
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser /*, collectionArray*/ } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        ///> Save user info to firebase
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          ///> Save user info for other compoenents to use
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      }

      setCurrentUser(userAuth);

      ///> Destructure the collectionArray because we don't want the id and routeName in the file.
      ///> We just need the title and items, the res will be handled by firestore
      // addCollectionAndDocuments(
      //   "collections",
      //   collectionArray.map(({ title, items }) => ({ title, items }))
      // );
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPages />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  // collectionArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
