
import { useRouter } from "next/router";
import Image from "next/image";

const Footer = () => {

  return (
    <footer className="bottom-0 w-full mx-auto py-4 ">
      <div className="w-52 mx-auto">
        <Image src="/mediamax.png" width={640} height={126} layout="responsive" />
      </div>
    </footer>
  );
};

export default Footer;
