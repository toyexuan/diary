import { ConfigInterface } from './loader';

export const ProdConfig: ConfigInterface = {
    DB: {
        Url: 'mongodb://localhost:27018/prod',
    },
    Session: {
        MaxAge: 7200000,
        Secret: 'secret'
    },
    Cache: {
        MaxAge: 7 * 24 * 60 * 60 * 1000
    },
    Port: 443,
    SSL: {
        key: './certificate/_.shaunxiao.com_private_key.key',
        cert: './certificate/shaunxiao.com_ssl_certificate.cert'
    }
}