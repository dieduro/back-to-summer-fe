import firebase, {firestore} from "./firebase";
import admin from "./firebase-admin"
import { ERROR_CODES, handleAuthError } from "./authErrorCodes";
import { createUser } from "./db";

export async function signUpWithEmailAndPass({ email, pass, name }) {
    return await firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(async authenticate=> {
        await authenticate.user
        .updateProfile({
         displayName: name
        });

        await createUser(authenticate.user.uid, {email, name})
        return authenticate.user;
      })
      .catch(async (error) => {
        console.log(error)
      });
};

export async function getUsers() {
    return admin
      .auth()
      .listUsers()
      .then((response) => {
          console.log(response)
        return response;
      })
      .catch((error) => {
        console.log(error)
      });
};

export async function deleteUsers(userIds) {
  return admin
    .auth()
    .deleteUsers(userIds)
    .then((deleteUsersResult) => {
      console.log(`Successfully deleted ${deleteUsersResult.successCount} users`);
      if (deleteUsersResult.failureCount > 0) {console.log(`Failed to delete ${deleteUsersResult.failureCount} users`)}
      return deleteUsersResult;
      deleteUsersResult.errors.forEach((err) => {
        console.log(err.error.toJSON());
      });
    })
    .catch((error) => {
      console.log('Error deleting users:', error);
    });
};

