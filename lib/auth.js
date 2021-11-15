import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import firebase from "./firebase";
import { v4 as uuidv4 } from "uuid";
import { createUser, checkUser, resetUser, getCompanyByEmail } from "./db";
import { ERROR_CODES, handleAuthError } from "./authErrorCodes";

const authContext = createContext();
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => {
  return useContext(authContext);
};

export const clearUserResults = (user) => {
  resetUser(user.uid);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      let user = await checkUser(rawUser.uid);
      if (!user || user.company == "") {
        const company = await getCompanyByEmail(rawUser.email)
        rawUser.company = company
        user = formatUser(rawUser);
      }

      setLoading(false);
      setUser(user);
      return user;
    } else {
      setLoading(false);
      setUser(false);
      return false;
    }
  };

  const signinWithGoogle = (redirect) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);
        if (redirect) {
          Router.push(redirect);
        }
      });
  };

  const signInWithEmailAndPass = ({ email, pass }) => {
    setLoading(true);
    pass = pass.toUpperCase()
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((response) => {
        localStorage.setItem('auth', response.user);
        return user;
      })
      .catch((error) => {
        return {
          error: true,
          message: handleAuthError(error.code),
        };
      });
  };

  const signUpWithEmailAndPass = ({ email, pass, name }) => {
    setLoading(true);
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((response) => {
        //createUser(response.uid, {email, name})
        //updateUserProfile({ displayName: name });
        return true;
      })
      .catch((error) => {
        if (error.code == ERROR_CODES.EMAIL_ALREADY_IN_USE) {
          createUser(uuidv4(), {email, name})
        }
        return {
          error: true,
          message: handleAuthError(error.code),
        };
      });
  };

  const sendPasswordResetEmail = (email, successCallback) => {
    setLoading(true);
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        successCallback();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };

  const updateUserProfile = (data) => {
    var user = firebase.auth().currentUser;
    user
      .updateProfile(data)
      .then(function (data) {
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem('auth')
        handleUser(false)
      });
  };
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
    return () => unsubscribe();
  }, []);
  return {
    user,
    loading,
    handleUser,
    signinWithGoogle,
    signUpWithEmailAndPass,
    sendPasswordResetEmail,
    signInWithEmailAndPass,
    updateUserProfile,
    signout,
  };
}

const formatUser = (user) => {
  const userData = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    company: user.company || "",
    status: user.status || "",
    score: user.score || 0,
    bestScore: user.bestScore || 0,
    answeredQuestions: user.answeredQuestions || [],
    currentResponses : user.currentResponses || 0,
    hasActiveTrivia: user.hasActiveTrivia || false,
    trivia: user.trivia || "",
    roundsPlayed: user.roundsPlayed || 0,
    timeUsed: user.timeUsed || 0,
  };

  createUser(user.uid, userData);

  return userData;
};
