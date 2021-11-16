import Button from "../ui/Button";


const ConfirmationPopup = ({actions, ...props}, ref) => {

    const {acceptCb, cancelCb} = actions
    return (
        <div className="absolute top-0 w-screen h-screen z-20 bg-gray bg-opacity-50 flex flex-col justify-center content-center">
            <div className="w-3/4 md:w-1/2 p-2 h-auto mx-auto bg-grayLight bg-opacity-75 rounded-xl shadow">
                <h3 className="text-black text-2xl text-center mt-2">
                    Si vas hacia atrás, la respuesta quedará como incorrecta.
                </h3>
                <div className="flex flex-col md:flex-row justify-center mt-4">
                    <Button onClick={acceptCb} size="small">Continuar</Button>
                    <Button onClick={cancelCb} size="small">Volver a pregunta</Button>
                </div>
            </div>

        </div>
    )
}
  
export default ConfirmationPopup
  