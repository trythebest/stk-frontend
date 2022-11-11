import { firebase } from "../../firebase";

// action will have a default dispatch method for sending the data to the reducer, and that dispatch is considered to be an action having two properties as type and payload

export const loginWithGoogle = () => async (dispatch) => {
  try {
    dispatch({ type: "GOOGLE_AUTH_REQUEST" }); // dispatching the google auth request
    const provider = new firebase.auth.GoogleAuthProvider(); // Initializing the google provider, same remains for other provider methods below

    const res = await firebase.auth().signInWithPopup(provider);

    const accessToken = res.credential.accessToken; // Getting the access token if user is logged In
    const profile = {
      // Getting the user name and picture for sending it to the auth Reducer
      name: res.additionalUserInfo.profile.name,
      picture: res.additionalUserInfo.profile.picture,
    };
    const currentUser = {
      // Getting the user details for sending it to the currentUser reducer
      name: res.additionalUserInfo.profile.name,
      picture: res.additionalUserInfo.profile.picture,
      email: res.additionalUserInfo.profile.email,
    };

    sessionStorage.setItem("sof-access-token", accessToken); // saving the token in sessionStorage
    sessionStorage.setItem("sof-user", JSON.stringify(profile)); //saving the user details in sessionStorage

    dispatch({
      //dispatching the success request with accessToken and user details to authReducer
      type: "GOOGLE_AUTH_SUCCESS",
      payload: {
        accessToken: accessToken,
        profile: profile,
      },
    });

    dispatch({
      //dispatching the currentUser details to currentuser Reducer
      type: "USER_DETAILS_SUCCESS",
      payload: currentUser,
    });
  } catch (error) {
    dispatch({ type: "GOOGLE_AUTH_FAIL", payload: error });
  }
};

export const loginWithFaceBook = () => async (dispatch) => {
  try {
    dispatch({ type: "FACEBOOK_AUTH_REQUEST" });
    const provider = new firebase.auth.FacebookAuthProvider();
    const res = await firebase.auth().signInWithPopup(provider);

    const accessToken = res.credential.accessToken;
    const profile = {
      name: res.additionalUserInfo.profile.name,
      picture: res.additionalUserInfo.profile.picture.data.url,
    };

    sessionStorage.setItem("sof-access-token", accessToken);
    sessionStorage.setItem("sof-user", profile);
    dispatch({
      type: "FACEBOOK_AUTH_SUCCESS",
      payload: {
        accessToken: accessToken,
        profile: profile,
      },
    });
    const currentUser = {
      name: res.additionalUserInfo.profile.name,
      picture: res.additionalUserInfo.profile.picture.data.url,
      email: res.additionalUserInfo.profile.email,
    };
    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: currentUser,
    });
  } catch (error) {
    dispatch({ type: "FACEBOOK_AUTH_FAIL", payload: error });
  }
};

export const loginWithGitHub = () => async (dispatch) => {
  try {
    dispatch({ type: "GITHUB_AUTH_REQUEST" });
    const provider = new firebase.auth.GithubAuthProvider();
    const res = await firebase.auth().signInWithPopup(provider);

    const accessToken = res.credential.accessToken;
    const profile = {
      name: res.additionalUserInfo.username,
      picture: res.additionalUserInfo.profile.avatar_url,
    };

    sessionStorage.setItem("sof-access-token", accessToken);
    sessionStorage.setItem("sof-user", profile);
    dispatch({
      type: "GITHUB_AUTH_SUCCESS",
      payload: {
        accessToken: accessToken,
        profile: profile,
      },
    });

    const currentUser = {
      name: res.additionalUserInfo.username,
      picture: res.additionalUserInfo.profile.avatar_url,
      email: res.user.multiFactor.user.email,
    };
    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: currentUser,
    });
  } catch (error) {
    dispatch({ type: "GITHUB_AUTH_FAIL", payload: error });
  }
};

export const logOut = () => async (dispatch) => {
  //Handling the logout action
  try {
    await firebase.auth().signOut(); //Firebase method of signing out the user

    dispatch({ type: "LOGOUT" });

    sessionStorage.clear(); //Clearing the sessionStorage manually
  } catch (error) {
    console.log(error);
  }
};