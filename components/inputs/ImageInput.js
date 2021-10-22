import { useEffect, useState } from 'react';
import Image from 'next/image'
import Loader from "react-loader-spinner";
import { uploadImage } from "../../lib/db";
import { Field } from "formik";
import ErrorMessage from "../ErrorMessage";
import theme from "../../theme.json";

const ImageCustomInput = ({imageSrc, uploadingImg, loaderColor, ...props}) => {
    const src = imageSrc ? imageSrc : "/image-placeholder.png"
    return (
        <>
            <label htmlFor="pic" className="text-secondary cursor-pointer">
                <div className="flex justify-center items-center h-[220px] w-[300px] bg-white">
                    {!uploadingImg ?
                        <Image src={src} width={300} height={220}/>
                    :   <Loader
                            type="Oval"
                            color={loaderColor}
                            height={43}
                            width={40}
                        />
                    }
                    {!src && <span className="absolute p-2">Seleccionar una imagen:</span> }
                </div>
            </label>
            <input type="file" id="pic" style="visibility:hidden;" {...props}/>
        </>
    )
}

const ImageInput = ({uploadCb, index, formProps, value}) => {

    const [imageSrc, setImageSrc]         = useState(value || null)
    const [imageFile, setImageFile]       = useState(null)
    const [uploadingImg, setUploadingImg] = useState(false)

    useEffect(()=> {
        setUploadingImg(false)
    }, [imageSrc])

    const onImageUpload = async (file) => {
        setUploadingImg(true)
        return new Promise(async (resolve, reject) => {
            try {
              await uploadImage(file, (url) => {
                  uploadCb(url)
                  setImageSrc(url)
                  setImageFile(null)
              })
              resolve();
            } catch (error) {
              console.error(error);
              reject();
            }
          });
    };

    const onImageChange = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.onloadend = () => {
                //setImageSrc(reader.result)
            }
    
            reader.readAsDataURL(file)
            // setImageFile(file)
            onImageUpload(file)
        }
    }

    const colors = theme.colors
    return (
        <>
            <div className="mx-4">
                <Field
                    name={`questions.${index}.photo`}
                    as={ImageCustomInput}
                    value={undefined}
                    onChange={onImageChange}
                    touched={formProps.touched[`questions.${index}.photo`]}
                    style={{ display: "none" }}
                    onBlur={formProps.handleBlur}
                    imageSrc={imageSrc}
                    uploadingImg={uploadingImg}
                    loaderColor={colors.primary.DEFAULT}
                />
                <ErrorMessage name={`questions.${index}.photo`}/>
                
                { imageFile &&
                    <button
                        type='button'
                        className="border mt-2 px-2 text-secondary bg-white"
                        onClick={onImageUpload} 
                    >Subir imagen</button>
                }
            </div>
        </>
    )
}


export default ImageInput;