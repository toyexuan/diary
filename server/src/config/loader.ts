import { readFileSync } from 'fs';
import { DevConfig } from './dev.config';
import { ProdConfig } from './prod.config';

export enum ServerEnvironment {
  PROD = 'prod',
  DEV = 'dev',
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

export class CfgLoader {
  constructor(
    private readonly env: ServerEnvironment,
    private readonly https?: boolean,
  ) {}

  public load() {
    if (!this.https) {
      ProdConfig.Port = 80;
    } else {
      ProdConfig.Port = 443;
      ProdConfig.SSL.key =
        ProdConfig.SSL.key instanceof Buffer
          ? ProdConfig.SSL.key
          : readFileSync(ProdConfig.SSL.key);
      ProdConfig.SSL.cert =
        ProdConfig.SSL.cert instanceof Buffer
          ? ProdConfig.SSL.cert
          : readFileSync(ProdConfig.SSL.cert);
    }
    return this.env === ServerEnvironment.PROD ? ProdConfig : DevConfig;
  }
}
