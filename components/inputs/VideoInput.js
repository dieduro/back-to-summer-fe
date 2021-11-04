import { useEffect, useState } from 'react';
import Loader from "react-loader-spinner";
import { uploadVideo } from "../../lib/db";
import { Field } from "formik";
import ErrorMessage from "../ErrorMessage";
import Button from "../../ui/Button";
import theme from "../../theme.json";

const VideoCustomInput = ({value, uploadingVideo, loaderColor, videoSrc, ...props}) => {
    console.log(789, videoSrc)
    const src = value?.videoUrl ? value.videoUrl : videoSrc
    console.log(234, src)
    return (
        <>
           
                <div className="flex justify-center items-center h-[220px] w-[300px] bg-white">
                    { uploadingVideo ? 
                        <Loader
                        type="Oval"
                        color={loaderColor}
                        height={43}
                        width={40}
                    />
                    : !src ? <img src="/upload.png" className="w-16 h-16" alt="Botón carga de video"/> : 
                        
                        <video src={src} controls>
                            Tu navegador no admite el elemento <code>video</code>.
                        </video>  
                    }
                </div>
            <Button><label htmlFor="pic" className="text-secondary cursor-pointer">{src ? 'Subir Otro Video': 'Subir Video'}</label></Button>
            <input type="file" id="pic" {...props}/>
        </>
    )
}

const VideoInput = ({uploadCb, index, formProps, value}) => {

    const [videoSrc, setVideoSrc]         = useState(value.videoUrl || null)
    const [videoFile, setVideoFile]       = useState(null)
    const [uploadingVideo, setUploadingVideo] = useState(false)
    console.log
    useEffect(()=> {
        setUploadingVideo(false)
    }, [videoSrc])

    const onVideoUpload = async (file) => {
        console.log(789, file)
        setUploadingVideo(true)
        return new Promise(async (resolve, reject) => {
            try {
              await uploadVideo(file, (url) => {
                  uploadCb(url)
                  setVideoSrc(url)
                  setVideoFile(null)
              })
              resolve();
            } catch (error) {
              console.error(error);
              reject();
            }
          });
    };

    const onVideoChange = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.onloadend = () => {
            }
    
            reader.readAsDataURL(file)
            onVideoUpload(file)
        }
    }

    const colors = theme.colors
    return (
        <>
            <div className="mx-4">
                <Field
                    name={`questions.${index}.video`}
                    as={VideoCustomInput}
                    value={undefined}
                    onChange={onVideoChange}
                    touched={formProps.touched[`questions.${index}.videoUrl`]}
                    style={{ display: "none" }}
                    onBlur={formProps.handleBlur}
                    videoSrc={videoSrc}
                    uploadingVideo={uploadingVideo}
                    loaderColor={colors.primary.DEFAULT}
                />
                <ErrorMessage name={`questions.${index}.photo`}/>
                
                { videoFile &&
                    <button
                        type='button'
                        className="border mt-2 px-2 text-secondary bg-white"
                        onClick={onVideoUpload} 
                    >Subir videon</button>
                }
            </div>
        </>
    )
}


export default VideoInput;