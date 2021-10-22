import { Field } from "formik";
import ErrorMessage from "../ErrorMessage";

const VideoInput = ({ index, formProps, value}) => {
    const videoUrl   = value ? value.url : ""
    const videoStart = value? value.start : ""
    const videoEnd   = value? value.end : ""

    return (
        <>
            <div className="flex flex-wrap justify-between mx-4">
            <div className="flex flex-col justify-between">
                <p className="text-secondary mb-2">URL del video</p>
                <Field
                    name={`questions.${index}.video.url`}
                    type="text"
                    className="text-secondary border-2 px-1 py-2 focus:outline-none focus:ring mb-1 disabled:opacity-50 bg-white"
                    value={videoUrl}
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
                    value={videoStart}
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
                    value={videoEnd}
                    touched={formProps.touched[`questions.${index}.video.end`]}
                    onBlur={formProps.handleBlur}
                />
            </div>

                <ErrorMessage name={`questions.${index}.videoUrl`}/>
            </div>
        </>
    )
}


export default VideoInput;