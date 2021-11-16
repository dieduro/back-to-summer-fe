import firebase, {storage, db} from "./firebase";
import { CATEGORIES, DIFFICULTIES } from "../utils/questionFormValues";

//    DEPRECATED
// const fillTrivia = (snapshot) => {
//   let trivia = [[null, null, null], [null, null, null], [null, null, null]];

//   snapshot.forEach((doc) => {
//     let question = doc.data();

//     for (let i = 0; i < DIFFICULTIES.length; i++) {
//       if (question.difficulty === DIFFICULTIES[i].value){
//         if (question.category === CATEGORIES[0].value && trivia[i][0] === null) {
//           trivia[i][0] = { docId: question.id, ...question };
//         } else if (question.category === CATEGORIES[1].value  && trivia[i][1] === null) {
//           trivia[i][1] = { docId: question.id, ...question };
//         } else if ( question.category === CATEGORIES[2].value && trivia[i][2] === null) {
//           trivia[i][2] = { docId: question.id, ...question };
//         }
//       }
      
//     }
//   });
  
//   return trivia
// }

const fillTrivia = (snapshot) => {
  let easyQuestions = [[], [], []]
  let mediumQuestions = [[], [], []]
  let hardQuestions = [[], [], []]
  let questionsPool = [easyQuestions, mediumQuestions, hardQuestions]

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  snapshot.forEach((doc) => {

    let question = doc.data();

    for (let i = 0; i < DIFFICULTIES.length; i++) {
      if (question.difficulty === DIFFICULTIES[i].value){
        switch (question.category) {
          case CATEGORIES[0].value:
            questionsPool[i][0].push(question);
            break;
          case CATEGORIES[1].value:
            questionsPool[i][1].push(question);
            break;
          case CATEGORIES[2].value:
            questionsPool[i][2].push(question);
            break;
          default:
            break;
        }
      }
    }
    
  });


  // IDENTIFY WRONG POINTS IN QUESTIONS
  // const pointsPerDiff = {
  //   "BAJA": 200,
  //   "MEDIA:": 400,
  //   "ALTA": 800
  // }
  // for (let i = 0; i < questionsPool[0].length; i++) {
  //   for (let j = 0; j < questionsPool[0][i].length; j++) {
  //     if (i == 1) {
  //       console.log(questionsPool[0][i][j].points)
  //     }
  //     if (questionsPool[0][i][j].points != pointsPerDiff[questionsPool[0][i][j].difficulty]){
  //       console.log(questionsPool[0][i][j])
  //     }
  //   }
  // }

  //console.log(questionsPool)

  const trivia = 
  [
    [
      questionsPool[0][0][getRandomInt(questionsPool[0][0].length)],
      questionsPool[0][1][getRandomInt(questionsPool[0][1].length)],
      questionsPool[0][2][getRandomInt(questionsPool[0][2].length)]
    ],
    [
      questionsPool[1][0][getRandomInt(questionsPool[1][0].length)],
      questionsPool[1][1][getRandomInt(questionsPool[1][1].length)],
      questionsPool[1][2][getRandomInt(questionsPool[1][2].length)]
    ],
    [
      questionsPool[2][0][getRandomInt(questionsPool[2][0].length)],
      questionsPool[2][1][getRandomInt(questionsPool[2][1].length)],
      questionsPool[2][2][getRandomInt(questionsPool[2][2].length)]
    ]
  ]
  
  return trivia
}

const firestore = firebase.firestore();

export async function getUser(userId) {
  let user;
  await firestore
    .collection("users")
    .where("uid", "==", userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        user = doc.data();
      });
    });
  return user;
}

export function checkUser(userId) {
  const user = getUser(userId);
  return user ? user : null;
}

export async function resetUser(userId) {
  const data = {
    status: "",
    score: "",
  };
  await firestore.collection("users").doc(userId).update(data);
}

export async function updateUser(uid, data) {
  const query = await firestore
    .collection("users")
    .doc(uid)
    .update(data, { merge: true });
  return query;
}

export async function createUser(uid, data) {
  await firestore.collection("users").doc(uid).set(data)
}

export function removeQuestion(docId) {
  const doc = firestore
    .collection("questions")
    .doc(docId)
    .delete()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}

export async function addQuestions(existingQuestionIds, data) {
  const batch = firestore.batch();
  data.forEach((doc) => {
    if (existingQuestionIds.includes(doc.docId)) {
      const docRef = firestore.collection("questions").doc(doc.docId);
      batch.update(docRef, doc);
    } else {
      const docRef = firestore.collection("questions").doc();
      batch.set(docRef, doc);
    }
  });
  await batch.commit();
}

export async function getQuestions() {
  try {
    const snapshot = await firestore.collection("questions").get();
    const questions = [];
    snapshot.forEach((doc) => {
      questions.push({ docId: doc.id, ...doc.data() });
    });

    return { questions };
  } catch (error) {
    return { error };
  }
}

export async function getUsersCollection() {
  try {
    const snapshot = await firestore.collection("users").orderBy('company').get();
    const users = [];
    snapshot.forEach((doc) => {
      users.push({ docId: doc.id, ...doc.data() });
    });

    return users;
  } catch (error) {
    return { error };
  }
}

export async function getUserData(userId) {
  try {
    const snapshot = await firestore.collection("users").doc(userId).get();
    const userData = snapshot.data();

    return userData;
  } catch (error) {
    return { error };
  }
}

export async function getCompanyByEmail(email) {
  try {
    let company
    await fetch(`/api/getUsersFromSheet/${email}`)
    .then(res => res.json())
    .then(data => { 
      company =  data.company || ''
    })
    return company
  } catch (error) {
    return { error };
  }
}

export async function getTrivia(user) {

  if (user && user.hasActiveTrivia && user.trivia) {
    const parsedTrivia = JSON.parse(user.trivia);

    return parsedTrivia
  } else {
    try {
      let snapshot
      if (user?.answeredQuestions?.length == 0) {  
        snapshot = await firestore.collection("questions").get();
      } else if (user) {
        snapshot = await firestore.collection("questions").where("id", "not-in", user.answeredQuestions).get();
      } else {
        snapshot = await firestore.collection("questions").get();
      }
      
      const trivia = fillTrivia(snapshot);
      return trivia;
    } catch (error) {
      console.log(error)
      return { error };
    }
  }
}

export async function getLeaderboard() {
  try {
    const snapshot = await firestore
      .collection("users")
      .where("bestScore", "!=", "")
      .orderBy("bestScore", "desc")
      .orderBy("timeUsed", "asc")
      .get();
    const users = [];
    snapshot.forEach((doc) => {

      users.push({ id: doc.id, ...doc.data() });
    });
    return { users };
  } catch (error) {
    return { error };
  }
}

export async function uploadImage(image, onSuccessCallback) {

    try {
      const uploadTask = storage.ref(`images/${image.name}`).put(image)
      uploadTask.on(
        "state_changed",
        snapshot => {
          // const progress = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
          // progressCallback(progress);
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              onSuccessCallback(url)
            });
        }
      );
    }
    catch(error) {
      console.log(error)
    }  
}

export async function uploadVideo(video, onSuccessCallback) {

  try {
    const uploadTask = storage.ref(`videos/${video.name}`).put(video)
    uploadTask.on(
      "state_changed",
      snapshot => {
        // const progress = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
        // console.log(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("videos")
          .child(video.name)
          .getDownloadURL()
          .then(url => {
            onSuccessCallback(url)
          });
      }
    );
  }
  catch(error) {
    console.log(error)
  }  
}

export async function uploadAudio(audio, onSuccessCallback) {

  try {
    const uploadTask = storage.ref(`audios/${audio.name}`).put(audio)
    uploadTask.on(
      "state_changed",
      snapshot => {
        // const progress = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
        // progressCallback(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("audios")
          .child(audio.name)
          .getDownloadURL()
          .then(url => {
            onSuccessCallback(url)
          });
      }
    );
  }
  catch(error) {
    console.log(error)
  }
}

export async function setAnswer(userId, data) {
  try {
    const query = await firestore
      .collection("users")
      .doc(userId)
      .update(data);
    return query;
  } catch (error) {
    console.log(error)
    return { error };
  }
}

export async function setActivteTriviaToUser(userId, data) {
  try {
    const query = await firestore
      .collection("users")
      .doc(userId)
      .update(data);
    return query;
  } catch (error) {
    console.log(error)
  }
}

export async function resetActivteTrivia(user) {
  const data = {
    hasActiveTrivia : false,
    trivia : "",
    roundsPlayed: user.roundsPlayed + 1,
    currentResponses: 0,
    bestScore: user.score
  }
  try {
    const query = await firestore
      .collection("users")
      .doc(user.uid)
      .update(data);
    return query;
  } catch (error) {
    console.log(error)
  }
}

export async function setBestScore(userId, score) {
  const data = {
    bestScore: score
  }
  try {
    const query = await firestore
      .collection("users")
      .doc(user.uid)
      .update(data);
    return query;
  } catch (error) {
    console.log(error)
    return { error };
  }
}