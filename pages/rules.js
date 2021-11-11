
import Link from 'next/link';
import Button from '../ui/Button';
import { Circles } from "@agney/react-loading";
import theme from "../theme.json";

export default function Rules() {

    const { colors } = theme 

    return (
        <>
            <div className="content-center mx-auto w-28 mt-28">
                <Circles width="110" height="120" color={colors.white} />
            </div>
            <Link href="/">
                <Button>Volver</Button>
            </Link>
        </>
    );
}