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
