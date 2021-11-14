
import Link from 'next/link';
import Button from '../ui/Button';
import { Circles } from "@agney/react-loading";
import theme from "../theme.json";

export default function Rules() {

    const pStyle = 'text-white leading-loose font-semibold'

    const { colors } = theme 

    return (
        <>
            <div className="relative h-auto">
                <h1 className="w-64 mx-auto mt-8 p-2 text-white text-6xl text-center align-middle font-blenny leading-[0.6]">
                    back to summer
                </h1>
            </div>
            <div className="content-center mx-auto w-full sm:w-3/4 p-6">
                <p className={pStyle}>
                    🌊 Cada participante tendrá la posibilidad de jugar 2 veces únicamente. </p>
                <p className={pStyle}>
                    🌊 Se tomará el mayor valor conseguido entre las 2 oportunidades de juego. NO se suman, se toma el mejor puntaje de los 2. </p>
                <p className={pStyle}>
                🌊 Cada oportunidad para jugar se tomará al iniciar cada partida.</p>
                <p className={pStyle}>
                    🌊 El juego constará de una grilla con 9 preguntas, distribuidos en 3 rubros distintos (playa, música, marcas) y 3 dificultades (alta, media, baja).</p>
                <p className={pStyle}>
                    🌊 Las preguntas son multiple-choice de 4 opciones en dónde 1 (una) sola respuesta es la correcta, éstas pueden incluir video y audio, así que sugerimos chequear que tengas el sonido activado.</p>
                <p className={pStyle}>
                    🌊 El tiempo que tendrás para responder cada pregunta es de 20 segundos. </p>
                <p className={pStyle}>
                    🌊 Podrás seleccionar en forma aleatoria el rubro y la dificultad que desees contestar sin orden preestablecido hasta que contestes cada una de las 9 preguntas.</p> 
                <p className={pStyle}> 🌊 El juego termina al responder toda la grilla. </p>
                <p className={pStyle}>
                    🌊 Las preguntas con dificultad baja valen 200 puntos, las de dificultad media 400 puntos y las de dificultad alta 800 puntos. </p>
                <p className={pStyle}>
                    🌊 La respuesta contestada correctamente suman el valor de la dificultad elegida.</p>
                <p className={pStyle}>
                    🌊 Las respuestas incorrectas restan la mitad del puntaje. (ejemplo: Si contestas por la de 800 de forma incorrecta resta -400.)</p>
                <p className={pStyle}>
                    🌊 Una pregunta sin contestar pasados los 20 segundos se tomará como incorrecta. </p>
                <p className={pStyle}>
                    🌊 El lugar que vas a tener en el ranking será en base al puntaje obtenido. </p>
                <p className={pStyle}>
                    🌊 En caso de igualdad de puntos se definirá la posición en base al tiempo que utilizaron para responder las 9 preguntas (ejemplo: si dos participantes tienen 1.000 puntos tendrá un puesto mejor el que haya contestado en menos tiempo todo el juego) </p>
                <p className={pStyle}>
                    🌊 Ganará el juego aquel que sume la mayor cantidad de puntos, quien obtendrá el premio mayor. Los que estén dentro del top 10 reflejados en el ranking también obtendrán su premio por la posición obtenida. </p>
            </div>
            <div className="flex justify-between w-full p-4">
                <Link href="/">
                    <Button>Volver</Button>
                </Link>
            </div>
        </>
    );
}