"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevConfig = {
    DB: {
        Url: 'mongodb://localhost:27018/dev',
    },
    Session: {
        MaxAge: 7200000,
        Secret: 'secret',
    },
    Cache: {
        MaxAge: 7 * 24 * 60 * 60 * 1000,
    },
    Port: 3000,
};
//# sourceMappingURL=dev.config.js.map