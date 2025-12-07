import { Metadata } from "next";

type Props = {
    params: Promise<{ clientId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { clientId } = await params;
    return { title: `${clientId} | QR Scan` };
}

export default function SessionLayout({ children }: { children: React.ReactNode }) {
    return children;
}
