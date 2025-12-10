"use server";

import waha from "@/lib/waha";

import { Session } from "./types";

export async function getAllSessions(): Promise<Session[]> {
    const response = await waha.get("/api/sessions", { params: { all: true } });
    return response.data;
}

export async function getSession(sessionId: string): Promise<Session> {
    const response = await waha.get(`/api/sessions/${sessionId}`);
    return response.data;
}

export async function createSession(data: {
    name: string;
    start: boolean;
    config?: Session["config"];
}): Promise<Session> {
    const response = await waha.post("/api/sessions", data);
    return response.data;
}

export async function restartSession(session: Session): Promise<Session> {
    const response = await waha.post(`/api/sessions/${session.name}/restart`);
    return response.data;
}

export async function getSessionQR(session: Session): Promise<{ value: string }> {
    const response = await waha.get(`/api/${session.name}/auth/qr?format=raw`);
    return response.data;
}
