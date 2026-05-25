interface AvciCMSConfig {
    apiKey: string;
    projectId: string;
    baseUrl?: string;
}
declare class AvciCMS {
    private config;
    private baseUrl;
    constructor(config: AvciCMSConfig);
    content(modelSlug: string): {
        findMany: (options?: any) => Promise<never[]>;
    };
}

export { AvciCMS, type AvciCMSConfig };
