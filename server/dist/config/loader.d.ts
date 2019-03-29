export declare enum ServerEnvironment {
    PROD = "prod",
    DEV = "dev"
}
export interface HttpsOptions {
    pfx?: any;
    key?: any;
    passphrase?: string;
    cert?: any;
    ca?: any;
    crl?: any;
    ciphers?: string;
    honorCipherOrder?: boolean;
    requestCert?: boolean;
    rejectUnauthorized?: boolean;
    NPNProtocols?: any;
    SNICallback?: (servername: string, cb: (err: Error, ctx: any) => any) => any;
}
export interface ConfigInterface {
    DB: {
        Url: string;
    };
    Session: {
        MaxAge: number;
        Secret: string;
    };
    Cache: {
        MaxAge: number;
    };
    Port: number;
    SSL?: HttpsOptions;
}
export declare class CfgLoader {
    private readonly env;
    private readonly https?;
    constructor(env: ServerEnvironment, https?: boolean);
    load(): ConfigInterface;
}
