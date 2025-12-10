"use server";

import axios from "axios";

const waha = axios.create({
    baseURL: process.env.WAHA_HOST,
    headers: { "x-api-key": process.env.WAHA_API_KEY },
});

export default waha;
