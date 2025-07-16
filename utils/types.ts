export type Session = {
    name: string;
    status: string;
    config: {
        metadata: Record<string, string>;
        webhooks: {
            url: string;
            events: string[];
            retries: {
                delaySeconds: number;
                attempts: number;
                policy: string;
            };
            customHeaders: null;
        }[];
    };
};

const x = {
    name: "roy-barzilay",
    status: "WORKING",
    config: {
        metadata: {},
        webhooks: [
            {
                url: "https://n8n.brzly.com/webhook-test/moshe-talit-whatsapp-message",
                events: ["message"],
                hmac: {
                    key: null,
                },
                retries: {
                    delaySeconds: 2,
                    attempts: 15,
                    policy: "exponential",
                },
                customHeaders: null,
            },
        ],
    },
    me: {
        id: "972527088557@c.us",
        pushName: "Roy Barzilay",
        jid: "972527088557:47@s.whatsapp.net",
    },
    assignedWorker: "",
};
