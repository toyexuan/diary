"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const dev_config_1 = require("./dev.config");
const prod_config_1 = require("./prod.config");
var ServerEnvironment;
(function (ServerEnvironment) {
    ServerEnvironment["PROD"] = "prod";
    ServerEnvironment["DEV"] = "dev";
})(ServerEnvironment = exports.ServerEnvironment || (exports.ServerEnvironment = {}));
class CfgLoader {
    constructor(env, https) {
        this.env = env;
        this.https = https;
    }
    load() {
        if (!this.https) {
            prod_config_1.ProdConfig.Port = 80;
        }
        else {
            prod_config_1.ProdConfig.Port = 443;
            prod_config_1.ProdConfig.SSL.key =
                prod_config_1.ProdConfig.SSL.key instanceof Buffer
                    ? prod_config_1.ProdConfig.SSL.key
                    : fs_1.readFileSync(prod_config_1.ProdConfig.SSL.key);
            prod_config_1.ProdConfig.SSL.cert =
                prod_config_1.ProdConfig.SSL.cert instanceof Buffer
                    ? prod_config_1.ProdConfig.SSL.cert
                    : fs_1.readFileSync(prod_config_1.ProdConfig.SSL.cert);
        }
        return this.env === ServerEnvironment.PROD ? prod_config_1.ProdConfig : dev_config_1.DevConfig;
    }
}
exports.CfgLoader = CfgLoader;
//# sourceMappingURL=loader.js.map