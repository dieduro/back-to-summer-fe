import React, { useState, useEffect, useRef } from "react";
import { Field } from "formik";
import theme from "../theme.json";
import {TYPES, CATEGORIES, DIFFICULTIES} from '../utils/questionFormValues'

import ImageInput from "./inputs/ImageInput"
import VideoInput from "./inputs/VideoInput"
import AudioInput from "./inputs/AudioInput"
import ErrorMessage from "./ErrorMessage";
import CheckCircle from "../icons/CheckCircle";
import XCircle from "../icons/XCircle";
import ChevronRight from "../icons/ChevronRight";
import Remove from "../icons/Remove";

const EditableQuestion = ({
  question,
  formProps,
  index,
  removeQuestionCb
}) => {

  const [selected, setSelected] = useState(null);
  const [questionType, setQuestionType] = useState(question.type)
  const [questionImageUrl, setQuestionImageUrl] = useState(question.imageUrl);
  const [questionVideoUrl, setQuestionVideoUrl] = useState(question.videoUrl);
  const [questionAudioUrl, setQuestionAudioUrl] = useState(question.audioUrl);
  
  const container1 = useRef(null);
  const { setFieldValue } = formProps
  let height = selected == 1 ? container1.current.scrollHeight : "";

  useEffect(() => {
    setFieldValue(
      `questions.${index}.imageUrl`,
      questionImageUrl
    )
  }, [questionImageUrl])

  useEffect(() => {
    setFieldValue(
      `questions.${index}.videoUrl`,
      questionVideoUrl
    )
  }, [questionVideoUrl])

  useEffect(() => {
    setFieldValue(
      `questions.${index}.audioUrl`,
      questionAudioUrl
    )
  }, [questionAudioUrl])

  useEffect( ()=> {
    height = container1.current.scrollHeight

    if (!question.points) {
      setFieldValue(`questions.${index}.points`, 200)
    }
  }, [questionType])


  const handleClick = () => {
    selected !== 1 ? setSelected(1) : setSelected(null);
    
  };

  const onQuestionTypeChanged = (e) => {
    let type = e.target.value
    setQuestionType(type)
    setFieldValue(`questions.${index}.type`, type)
  }

  const setDifficultyAndScore = (difficulty) => {
    let points
    if (difficulty === DIFFICULTIES.BAJA) { points = 200 }
    else if (difficulty === DIFFICULTIES.MEDIA) { points = 400 }
    else { points = 800 }

    setFieldValue(`questions.${index}.points`, points)
    setFieldValue(`questions.${index}.difficulty`, difficulty)
  }

  const onImgUploadCb = url => {
    setQuestionImageUrl(url) 
  }

  const onVideoUploadCb = url => {
    setQuestionVideoUrl(url) 
  }

  const onAudioUploadCb = url => {
    setQuestionAudioUrl(url) 
  }

  const questionDesc = question?.description;
  const options      = question?.options;
  const colors       = theme.colors;

  return (
    <>
      <div className="mb-2 bg-white max-w-xl mx-auto border-gray-200">
        <ul className="shadow-box">
          <li className="relative bg-gray border-gray-200">
            <div className="flex justify-around p-2">
              <Field
                name={`questions.${index}.description`}
                type="text"
                className="w-11/12 border-2 mx-2 my-2 p-2 text-left text-secondary focus:outline-none focus:ring disabled:opacity-50 bg-white"
                placeholder="Pregunta"
                disabled={formProps.isSubmitting}
                value={questionDesc}
              />
              <ErrorMessage name={`questions[${index}].description`} />
              <div className="flex flex-col justify-around px-2">
                <div
                  onClick={(e) => {
                    removeQuestionCb(index, question.docId);
                  }}
                >
                  <Remove />
                </div>
                <div onClick={handleClick}>
                  <ChevronRight
                    fillColor={colors.dark}
                    className={
                      selected == 1 ? "transform rotate-180" : undefined
                    }
                  />
                </div>
              </div>
            </div>

            <div
              className="relative overflow-hidden transition-all max-h-0 duration-700"
              style={{ maxHeight: height }}
              ref={container1}
            >
              <div className="flex flex-wrap flex-row justify-start w-5/6 mb-4 mx-4">
                <div className="m-2">
                  <p className="text-secondary mb-2">Categoría:</p>
                  <Field
                    name={`questions.${index}.category`}
                    value={question.category ? question.category : formProps.values.questions[index].category}
                    as="select"
                    className="text-secondary border-2 px-1 py-2 focus:outline-none focus:ring mb-1 disabled:opacity-50 bg-white"
                    placeholder="Type"
                    disabled={formProps.isSubmitting}
                  >
                    {CATEGORIES.map(category => {
                      return <option key={category.value} value={category.value}>{category.copy}</option>
                    })}
                  </Field>
                </div>
                <div className="m-2">
                  <p className="text-secondary mb-2">Dificultad:</p>
                  <Field
                    name={`questions.${index}.difficulty`}
                    value={question.difficulty ? question.difficulty : formProps.values.questions[index].difficulty}
                    as="select"
                    className="text-secondary border-2 px-1 py-2 focus:outline-none focus:ring mb-1 disabled:opacity-50 bg-white"
                    placeholder="Type"
                    disabled={formProps.isSubmitting}
                    onChange={e => {setDifficultyAndScore(e.target.value)}}
                  >
                    {DIFFICULTIES.map(difficulty => {
                      return <option key={difficulty.value} value={difficulty.value}>{difficulty.copy}</option>
                    })}
                  </Field>
                </div>
                
                <div className="m-2">
                  <p className="text-secondary mb-2">Tipo:</p>
                  <Field
                    name={`questions.${index}.type`}
                    value={question.type ? question.type : formProps.values.questions[index].type}
                    as="select"
                    className="text-secondary border-2 px-1 py-2 focus:outline-none focus:ring mb-1 disabled:opacity-50 bg-white"
                    placeholder="Type"
                    onChange={onQuestionTypeChanged}
                    disabled={formProps.isSubmitting}
                  >
                    {TYPES.map(type => {
                      return <option key={type.value} value={type.value}>{type.copy}</option>
                    })}
                  </Field>
                </div>
              </div>
              { questionType == "image" && <ImageInput uploadCb={onImgUploadCb} index={index} formProps={formProps} value={question.imageUrl}/> }
              { questionType == "video" && <VideoInput uploadCb={onVideoUploadCb} index={index} formProps={formProps} value={question}/> }
              { questionType == "audio" && <AudioInput uploadCb={onAudioUploadCb} index={index} formProps={formProps} value={question?.audio}/> }

              <div className="w-5/6 m-4">
                <p className="text-secondary">Respuestas:</p>
              </div>
              <div  className="flex flex-col justify-between w-5/6">
              {options.map((option, optionIndex) => (
                <div key={option.id} className="m-2">
                  <div className="flex items-center">
                    <div className="flex-auto">
                      <Field
                        name={`questions.${index}.options.${optionIndex}.content`}
                        type="text"
                        className="text-secondary border-2 px-4 py-2 focus:outline-none focus:ring w-full mb-1 disabled:opacity-50 bg-white"
                        placeholder={`Respuesta #${optionIndex + 1}`}
                        disabled={formProps.isSubmitting}
                        value={option.content}
                      />
                    </div>
                    <div className="ml-4">
                      <button
                        type="button"
                        className="focus:outline-none focus:ring disabled:opacity-50"
                        disabled={formProps.isSubmitting}
                        onClick={() => {
                          setFieldValue(
                            `questions.${index}.validOption`,
                            option.id
                          );
                        }}
                      >
                        {question.validOption === option.id ? (
                          <CheckCircle className="h-6 text-green-500" />
                        ) : (
                          <XCircle
                            className="h-6 text-red-500"
                            fillColor={colors.error}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <ErrorMessage
                    name={`questions[${index}].options[${optionIndex}].content`}
                  />
                </div>
              ))}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default EditableQuestion;
