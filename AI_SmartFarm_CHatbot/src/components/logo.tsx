import { cn } from "@/lib/utils";
import type { SVGProps } from "react";
import Image from "next/image";
import chatbot from '@/asset/chatbot.png';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <Image
      src={chatbot.src}
      alt="Logo"
      width={40}
      height={40}
      className={cn("drop-shadow-lg", props.className)}
    />
  );
}
