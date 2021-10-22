import { useEffect, useState } from 'react';
import Loader from "react-loader-spinner";
import { uploadAudio } from "../../lib/db";
import { Field } from "formik";
import ErrorMessage from "../ErrorMessage";
import theme from "../../theme.json";

const AudioCustomInput = ({audioSrc, uploadingAudio, loaderColor, ...props}) => {
    const src = audioSrc ? audioSrc : ""
    return (
        <>
            <label htmlFor="audio" className="text-secondary cursor-pointer">
                <div className="flex justify-center items-center h-[70px] w-[300px] bg-white">
                    {!src && <span className="p-2 mx-auto">Seleccionar un archivo</span> }
                    {!uploadingAudio ?
                        <>
                        {src &&
                            <audio controls>
                                <source src={src} type="audio/mpeg"/>
                                <source src={src} type="audio/ogg"/>
                            </audio>
                        }
                        </>

                    :   <Loader
                            type="Oval"
                            color={loaderColor}
                            height={43}
                            width={40}
                        />
                    }
                  
                </div>
            </label>
            <input type="file" id="audio" style="visibility:hidden;" {...props}/>
        </>
    )
}

const AudioInput = ({uploadCb, index, formProps, value}) => {

    const [audioSrc, setAudioSrc]         = useState(value || null)
    const [audioFile, setAudioFile]       = useState(null)
    const [uploadingAudio, setUploadingAudio] = useState(false)

    useEffect(()=> {
        setUploadingAudio(false)
    }, [audioSrc])

    const onAudioUpload = async () => {
        setUploadingAudio(true)
        return new Promise(async (resolve, reject) => {
            try {
              await uploadAudio(audioFile, (url) => {
                  uploadCb(url)
                  setAudioSrc(url)
                  setAudioFile(null)
              })
              resolve();
            } catch (error) {
              console.error(error);
              reject();
            }
          });
    };

    const onAudioChange = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.onloadend = () => {
                console.log(reader.result)
                setAudioSrc(reader.result)
            }
    
            reader.readAsDataURL(file)
            setAudioFile(file)
        }
    }

    const colors = theme.colors
    return (
        <>
            <div className="mx-4">
                <Field
                    name={`questions.${index}.audio`}
                    as={AudioCustomInput}
                    value={undefined}
                    onChange={onAudioChange}
                    touched={formProps.touched[`questions.${index}.photo`]}
                    style={{ display: "none" }}
                    onBlur={formProps.handleBlur}
                    audioSrc={audioSrc}
                    uploadingAudio={uploadingAudio}
                    loaderColor={colors.primary.DEFAULT}
                />
                <ErrorMessage name={`questions.${index}.audio`}/>
                
                { audioFile &&
                    <button
                        type='button'
                        className="border mt-2 px-2 text-secondary bg-white"
                        onClick={onAudioUpload} 
                    >Subir Audio</button>
                }
            </div>
        </>
    )
}


export default AudioInput;