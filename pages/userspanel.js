import React, {useState} from "react";
import { addQuestions, getUsersCollection } from "../lib/db";
import Button from "../ui/Button";
import Heading from "../ui/Heading";

const registerUsers = async () => {
  await fetch('/api/process-users-sheet').then(res => {console.log(res)})
}

const deleteUsers = async () => {
  await fetch('/api/delete-users').then(res => {console.log(res)})
}

const fixQuestionPoints = async () => {
  let questions
  await fetch('/api/getMediumQuestions')
  .then(res => (res.json()))
  .then(data => { questions = data})

  let ids = []
  console.log("Total questions: ", questions.length)
  questions.map(question => {
    if (question.difficulty === 'MEDIA') {
      question.points = 400
      ids.push(question.docId)
    }
  })

    console.log(questions)
    await addQuestions(ids, questions)
  }

  const removeDupQuestions = async () => {
    let questions
    await fetch('/api/getQuestions')
    .then(res => (res.json()))
    .then(data => { questions = data})
  
    let ids = []
    console.log("Total questions: ", questions.length)
    questions.map(question => {
      if (ids.includes(question.docId)) {
        console.log("Dup: ", question.docId)
        //await remove
      }else {
        ids.push(question.docId)
      }
      console.log(ids)
    })
  
      console.log(questions)
      //await addQuestions(ids, questions)
    }

const UsersPanel = ({ questions }) => {
    
   const [users, setUsers] = useState(null)


  const getUsersFromDb = async () => {
    const dbUsers = await getUsersCollection()
    console.log(22, dbUsers)
    setUsers(dbUsers)
}


  return (
    <div className="bg-white min-h-[80vh]">
      <div className="my-4">
        <Heading type="h1" color="dark">
            Users Panel
        </Heading>
      </div>
      {
        process.env.NODE_ENV === 'development' &&
        <>
            {users &&
            <div>
                <h3>Hay {users.length} users</h3>
                <ul>

                    {users.map(user => (
                        <li key={user.uid}>
                            {user.name } - {user.email} -  {user.company}
                        </li>
                    ))}
                </ul>
            </div>
        }
          <Button onClick={e => registerUsers()}>Registrar test users</Button>
          <Button onClick={e => deleteUsers()}>Borrar test users</Button>
          <Button onClick={e => getUsersFromDb()}>Get Users in Collection</Button>
          {/* <Button onClick={e => fixQuestionPoints()}>Fix Puntajes</Button> */}
        </>
      }
      
    </div>
  );
};

export default UsersPanel;
