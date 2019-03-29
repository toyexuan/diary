"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logger = require("morgan");
const compression = require("compression");
const connectMongo = require("connect-mongo");
const express = require("express");
const session = require("express-session");
const mongoose_1 = require("mongoose");
const connectHistoryApiFallback = require("connect-history-api-fallback");
const loader_1 = require("./config/loader");
const command_parser_1 = require("./command.parser");
class Application {
    constructor(env = loader_1.ServerEnvironment.DEV, ssl = false, port, log = logger('dev'), h5history = connectHistoryApiFallback({
        verbose: true,
        index: '/',
    }), compressor = compression({
        level: 9,
    })) {
        this.env = env;
        this.ssl = ssl;
        this.port = port;
        this.log = log;
        this.h5history = h5history;
        this.compressor = compressor;
        this.config = new loader_1.CfgLoader(this.env, this.ssl).load();
        this.port = this.port || this.config.Port || 3000;
        this.staticFiles = express.static('public', {
            maxAge: this.config.Cache.MaxAge,
        });
    }
    bootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app = yield core_1.NestFactory.create(app_module_1.AppModule, {
                bodyParser: true,
                cors: true,
                httpsOptions: this.config.SSL,
            });
            this.app
                .use(this.log)
                .use(this.compressor)
                .use(this.h5history)
                .use(this.staticFiles);
            this.setViewEngine('ejs');
            yield this.start(this.port);
            if (module.hot) {
                module.hot.accept();
                module.hot.dispose(() => this.app.close());
            }
        });
    }
    setViewEngine(view) {
        this.app.set('views', 'public');
        this.app.set('view engine', view);
        this.app.setViewEngine('html');
    }
    setConnectSession() {
        const MongoStore = connectMongo(session);
        this.app.use(session({
            secret: this.config.Session.Secret,
            resave: true,
            saveUninitialized: false,
            cookie: { maxAge: this.config.Session.MaxAge, httpOnly: false },
            store: new MongoStore({
                mongooseConnection: mongoose_1.connection,
            }),
        }));
    }
    start(port) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(port);
        });
    }
}
const commandArgs = new command_parser_1.CommandArgvParser();
const isDevMode = commandArgs.get('dev') || !commandArgs.get('prod');
new Application(isDevMode ? loader_1.ServerEnvironment.DEV : loader_1.ServerEnvironment.PROD, commandArgs.get('https'), parseInt(commandArgs.get('port'), 10)).bootstrap();
//# sourceMappingURL=main.js.map