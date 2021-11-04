import { read } from "../../lib/sheetReader"
import admin from "../../lib/firebase-admin"
import {signUpWithEmailAndPass} from "../../lib/apiAuth.js";
import { v4 as uuidv4 } from "uuid";
//import { createUser } from "../../lib/db";

const getAuthDataAndStore = async () => {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRb3nv2wyvZFVITIkKv9YqUEFhCsC4HIEWVh2LASr1tfUKJeHSBLt74Q4-NPNSf5A/pub?gid=1194016082&single=true&output=csv"//rocess.env.NEXT_PUBLIC_USERS_SHEEET_URL
  let usersCreated = 0

  await read(url).then(async (users) => {
    await  users.map(async (user) => {
      const name = `${user.NOMBRE} ${user.APELLIDO}`
      await signUpWithEmailAndPass({email: user.MAIL, pass:user.CODIGO, name})
      .then((response) => {
          if(response) { usersCreated++}
      })
  })
})
  return usersCreated 
};

const importUsers = async (userImportRecords) => {
  admin.auth()
  .importUsers(userImportRecords, {
    hash: {
      algorithm: 'BCRYPT',
    },
  })
  .then((userImportResult) => {
    console.log(userImportResult)
    // The number of successful imports is determined via: userImportResult.successCount.
    // The number of failed imports is determined via: userImportResult.failureCount.
    // To get the error details.
    userImportResult.errors.forEach((indexedError) => {
      // The corresponding user that failed to upload.
      console.log(
        'Error ' + indexedError.index,
        ' failed to import: ',
        indexedError.error
      );
    });
  })
  .catch((error) => {
    console.log(error)
    // Some unrecoverable error occurred that prevented the operation from running.
  });
}

const createUsersCollection = async (users) => {
  users.map(async (user) => {
    console.log(111,user)
    await createUser(user.uid, {
      email: user.email,
      emailVerified: false,
      displayName: user.name,
      disabled: false,
    })
  })
}

export default async function handler2(req, res) {
    console.log("PROCESS SHEET CHURURUELE")
    const users = await getAuthDataAndStore()
    console.log("USERS CREATED", users)
    res.status(200).json('Users created: ', users)
  }