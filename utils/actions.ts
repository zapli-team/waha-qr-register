"use server";

import axios from "axios";

import { Session } from "./types";

export async function getAllSessions(clientId: string): Promise<Session[]> {
    const waha = axios.create({
        baseURL: `https://${clientId}.${process.env.WAHA_HOST}`,
        headers: { "x-api-key": process.env.WAHA_API_KEY },
    });
    const response = await waha.get("/api/sessions", { params: { all: true } });
    return response.data;
}

export async function getSession(clientId: string): Promise<Session> {
    const waha = axios.create({
        baseURL: `https://${clientId}.${process.env.WAHA_HOST}`,
        headers: { "x-api-key": process.env.WAHA_API_KEY },
    });
    const response = await waha.get("/api/sessions/default");
    return response.data;
}

export async function createSession(
    clientId: string,
    data: {
        start: boolean;
        config?: Session["config"];
    }
): Promise<Session> {
    const waha = axios.create({
        baseURL: `https://${clientId}.${process.env.WAHA_HOST}`,
        headers: { "x-api-key": process.env.WAHA_API_KEY },
    });
    const response = await waha.post("/api/sessions", { ...data, name: "default" });
    return response.data;
}

export async function restartSession(clientId: string): Promise<Session> {
    const waha = axios.create({
        baseURL: `https://${clientId}.${process.env.WAHA_HOST}`,
        headers: { "x-api-key": process.env.WAHA_API_KEY },
    });
    const response = await waha.post("/api/sessions/default/restart");
    return response.data;
}

export async function getSessionQR(clientId: string): Promise<{ value: string }> {
    const waha = axios.create({
        baseURL: `https://${clientId}.${process.env.WAHA_HOST}`,
        headers: { "x-api-key": process.env.WAHA_API_KEY },
    });
    const response = await waha.get("/api/default/auth/qr?format=raw");
    return response.data;
}
