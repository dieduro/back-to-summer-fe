import { useState } from 'react'
import { Field } from "formik";
import ErrorMessage from "../ErrorMessage";

const YouTubeInput = ({ index, formProps, value}) => {

    const [video, setVideo] = useState(value.video)

    return (
        <>
            <div className="flex flex-wrap justify-between mx-4">
            <div className="flex flex-col justify-between">
                <p className="text-secondary mb-2">URL del video</p>
                <Field
                    name={`questions.${index}.video.url`}
                    type="text"
                    className="text-secondary border-2 px-1 py-2 focus:outline-none focus:ring mb-1 disabled:opacity-50 bg-white"
                    value={video.url}
                    touched={formProps.touched[`questions.${index}.video.url`]}
                    onBlur={formProps.handleBlur}
                />
            </div>
            <div className="w-32 flex flex-col justify-between">
                <p className="text-secondary mb-2">Comienzo (en segundos)</p>
                <Field
                    name={`questions.${index}.video.start`}
                    type="text"
                    className="w-4/5 text-secondary border-2 px-1 py-2 focus:outline-none focus:ring mb-1 disabled:opacity-50 bg-white"
                    value={video.start}
                    touched={formProps.touched[`questions.${index}.video.start`]}
                    onBlur={formProps.handleBlur}
                />
            </div>
            <div className="w-32 flex flex-col justify-between">
                <p className="text-secondary mb-2">Fin (en segundos)</p>
                <Field
                    name={`questions.${index}.video.end`}
                    type="text"
                    className="w-4/5 text-secondary border-2 px-1 py-2 focus:outline-none focus:ring mb-1 disabled:opacity-50 bg-white"
                    value={video.end}
                    touched={formProps.touched[`questions.${index}.video.end`]}
                    onBlur={formProps.handleBlur}
                />
            </div>

                <ErrorMessage name={`questions.${index}.videoUrl`}/>
            </div>
        </>
    )
}


export default YouTubeInput;