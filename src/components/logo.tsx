import Image from "next/image";
import React from "react";

export default function Logo() {
    return (
        <div>
            <Image
                src="https://bytegrad.com/course-assets/react-nextjs/evento.png"
                alt="EVENTO logo"
                width={53}
                height={12}
            />
        </div>
    );
}
