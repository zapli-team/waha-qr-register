import { Metadata } from "next";

type Props = {
    params: Promise<{ sessionId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { sessionId } = await params;
    return { title: `${sessionId} | QR Scan` };
}

export default function SessionLayout({ children }: { children: React.ReactNode }) {
    return children;
}
