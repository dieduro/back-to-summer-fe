import { useState } from "react";
import { useRouter } from "next/router";
import { Formik, FieldArray, Form } from "formik";
import { addQuestions, removeQuestion } from "../lib/db";
import { parseYouTubeUrl } from "../utils/parseYouTubeUrl";
import * as Yup from "yup";
import Button from "../ui/Button";
import { v4 as uuidv4 } from "uuid";
import EditableQuestion from "./EditableQuestion";

const QuestionsForm = ({ questions }) => {
  
  const initialValues = {questions}
  
  const router = useRouter();
  const [message, setMessage] = useState("");

  const currentQuestionIds = [];

  questions.forEach((question) => {
    currentQuestionIds.push(question.docId);
  });

  const onSubmit = async (values) => {
    setMessage("Processing...");
    
    console.log(22, values)
    return new Promise(async (resolve, reject) => {
      try {
        await addQuestions(currentQuestionIds, values.questions);

        setMessage("Trivia creada. Redirigiendo a Inicio...");

        resolve();

        router.reload()
      } catch (error) {
        console.error(error);

        setMessage(error.message);

        reject();
      }
    });
  };

  const onRemove = async (id) => {
    try {
      await removeQuestion(id);
    } catch (error) {
      console.log(error);
    }
  };

  const FILE_SIZE = 160 * 1024;
  const IMAGE_SUPPORTED_FORMATS =
  [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
  ];

  const AUDIO_SUPPORTED_FORMATS =
  [
    "audio/mpeg",
    "audio/wav"
  ]

  const validationSchema = Yup.object().shape({
    questions: Yup.array()
      .min(1)
      .of(
        Yup.object().shape({
          id: Yup.string().required("Required"),
          description: Yup.string()
            .required("Required")
            .max(280, "Must be 280 characters or less"),
          validOption: Yup.string().required("Required"),
          options: Yup.array().of(
            Yup.object().shape({
              id: Yup.string().required("Required"),
              content: Yup.string()
                .required("Required")
                .max(280, "Must be 280 characters or less"),
            })
          ),
          photo: Yup
          .mixed()
          .test(
            "fileFormat",
            "Formato incorrecto",
            value => value ? IMAGE_SUPPORTED_FORMATS.includes(value.type) : true
          )
          .test(
            "fileSize",
            "Archivo demasiado grande",
            value => value ? value.size <= FILE_SIZE : true
          )
          .optional(),
          audio: Yup
          .mixed()
          .test(
            "fileFormat",
            "Formato incorrecto",
            value => value ? AUDIO_SUPPORTED_FORMATS.includes(value.type) : true
          )
          .test(
            "fileSize",
            "Archivo demasiado grande",
            value => value ? value.size <= FILE_SIZE : true
          )
          .optional()
        })
      ),
  });

  const addNewQuestion = (insert) => {
  
    const defaultValidOption = uuidv4()
    const newQuestion = {
      id: uuidv4(),
      description: "",
      type: "text",
      category: "playa",
      difficulty: 'BAJA',
      validOption: defaultValidOption,
      options: [
        {
          id: defaultValidOption,
          content: "",
        },
        {
          id: uuidv4(),
          content: "",
        },
        {
          id: uuidv4(),
          content: "",
        },
        {
          id: uuidv4(),
          content: "",
        },
      ],
    }

    insert(0, newQuestion)
  }

  
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formProps) => {
          const { values } = formProps;
          return (
            <Form className="px-12">
              <div className="mb-4">
                <FieldArray
                  name="questions"
                  render={({ insert, remove }) => (
                    <div className="mb-4">
                      <div className="flex items-center justify-between w-1/2 mx-auto mb-2">
                        <Button
                          type="button"
                          disabled={formProps.isSubmitting}
                          onClick={e => {addNewQuestion(insert)}}
                        >
                          Agregar Pregunta
                        </Button>
                        {values.questions.length > 0 && (
                          <Button
                            type="submit"
                            disabled={
                              !formProps.dirty || !formProps.isValid || formProps.isValidating || formProps.isSubmitting
                            }
                          >
                            Confirmar Preguntas
                          </Button>
                      )}
                      </div>
                      {values.questions.map((question, questionIndex) => {
                        return (
                          <EditableQuestion
                            key       = {question.id}
                            formProps = {formProps}
                            question  = {question}
                            index     = {questionIndex}
                            removeQuestionCb = {(index, questionId) => {
                              onRemove(questionId);
                              remove(index);
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
      {message && (
        <div className="mt-4 text-center">
          <p className="text-secondary italic">{message}</p>
        </div>
      )}
    </>
  );
};

export default QuestionsForm;
