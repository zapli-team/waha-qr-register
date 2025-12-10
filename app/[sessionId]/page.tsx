"use client";

import Image from "next/image";

import { Logo } from "@/components/logo";
import QRCode from "@/components/qr-code";

export default function SessionPage() {
    return (
        <main className="w-full h-full pt-32 space-y-20">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 tracking-wide">
                <Logo className="h-6 w-auto" />
            </div>
            <div className="flex flex-col items-center justify-center gap-4 h-[400px]">
                <QRCode />
            </div>
            <div className="relative h-px bg-white/10 mx-24">
                <p className="absolute top-1/4 left-1/2 -translate-1/2 px-2 text-white/40 bg-background">
                    כנסו לוואטסאפ וסרקו את הברקוד
                </p>
            </div>
            <div className="flex items-center justify-center gap-20">
                <Image
                    src="/guide.png"
                    alt="Logo"
                    width={3228}
                    height={1742}
                    priority
                    className="h-[400px] w-auto object-contain"
                />
            </div>
            <div className="flex items-center justify-center gap-20 pb-10 text-sm text-white/50">
                זאפלי 2025 © כל הזכויות שמורות.
            </div>
        </main>
    );
}
