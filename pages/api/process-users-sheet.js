import { read } from "../../lib/sheetReader"
import admin from "../../lib/firebase-admin"
import { v4 as uuidv4 } from "uuid";
import { createUser } from "../../lib/db";
import bcrypt from 'bcrypt'

const getAuthDataAndStore = async () => {
  const url = process.env.NEXT_PUBLIC_USERS_SHEEET_URL
  let formattedUsers = []

  await read(url).then(async (users) => {
    await  users.map(async (user) => {
        console.log(123, user.password)
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        user.password = await bcrypt.hash(user.password, salt);
        formattedUsers.push(
          {
            uid: user.password,
            email: user.user,
            passwordHash: Buffer.from(user.password),
            name: user.name
          }
        );
        console.log(345)
    })
    console.log(888, formattedUsers)
    return formattedUsers
  })
  
};

// hash_config {
  // algorithm: SCRYPT,
  // base64_signer_key: GEh1fsq1P2lXzJlA4mQKMM9RcwzvaMq9sKXYLaECMv4AorxM4B2dc4E7/g00Nh1sWCJcomDfX2QXqceaTNxHCw==,
  // base64_salt_separator: Bw==,
  // rounds: 8,
  // mem_cost: 14,
// }

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
    console.log("PROCESS SHEET")
    const usersPromise = new Promise((resolve, reject) => {
      const users = getAuthDataAndStore()
      resolve(users)
    })
    usersPromise.then(users => {console.log(222, users)})
    
    //importUsers(users)
    res.status(200).json({ name: 'John Doe' })
  }