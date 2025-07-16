"use client";

import { CircleCheckBig, CircleX, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

import { createSession, getAllSessions, getSession, getSessionQR, restartSession } from "@/utils/funcs";
import { useMutation, useQuery } from "@tanstack/react-query";

function QRCode() {
    const { sessionId } = useParams();
    const [qr, setQr] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    const {
        data: session,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ["sessions", sessionId],
        queryFn: async () => {
            if (typeof sessionId !== "string") return null;

            const sessions = await getAllSessions();
            let session = sessions.find(({ name }) => name === sessionId);
            if (!session) session = await createSession({ name: sessionId, start: false });

            return session;
        },
        refetchOnWindowFocus: false,
        retry: false,
    });

    const { mutate: fetchQR } = useMutation({
        mutationKey: ["qr-code", session],
        mutationFn: async () => {
            if (!session) return;

            await restartSession(session);
            const { value } = await getSessionQR(session);
            setQr(value);
        },
    });

    const { mutate: checkStatus } = useMutation({
        mutationKey: ["session-status", sessionId],
        mutationFn: async () => {
            if (typeof sessionId !== "string") return;

            const session = await getSession(sessionId);
            setIsConnected(session?.status === "WORKING");
        },
    });

    useEffect(() => {
        if (isConnected || !session) return;

        fetchQR();
        checkStatus();

        const qrInterval = setInterval(() => fetchQR(), 30 * 1000);
        const statusInterval = setInterval(() => checkStatus(), 1000);

        return () => {
            clearInterval(qrInterval);
            clearInterval(statusInterval);
        };
    }, [session, isConnected]);

    if (isError)
        return (
            <div className="flex flex-col items-center gap-4 text-red-500">
                <CircleX className="size-24" />
                <p>קרתה שגיאה בתהליך, אנא בדקו את החיבור שלכם לאינטרנט ונסו שוב.</p>
            </div>
        );

    if (isConnected)
        return (
            <div className="flex flex-col items-center gap-4 text-green-500">
                <CircleCheckBig className="size-24" />
                <p>חשבון הוואטסאפ שלכם התחבר בהצלחה!</p>
            </div>
        );

    if (isFetching || !qr) return <Loader2 className="animate-spin size-6" />;

    return <QRCodeCanvas value={qr} size={400} className="border-[20px] border-white" />;
}

export default QRCode;
