declare const module: any;

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import * as logger from 'morgan';
import * as compression from 'compression';
import * as connectMongo from 'connect-mongo';
import * as express from 'express';
import * as session from 'express-session';
import { connection as MongoConnect } from 'mongoose';
import * as connectHistoryApiFallback from 'connect-history-api-fallback';
import { CfgLoader, ServerEnvironment, ConfigInterface } from './config/loader';
import { CommandArgvParser } from './command.parser';

class Application {
  private app: NestExpressApplication;
  private staticFiles: express.RequestHandler;
  private config: ConfigInterface;

  constructor(
    private env = ServerEnvironment.DEV,
    private ssl = false,
    private port?: number,
    private log = logger('dev'),
    private h5history = connectHistoryApiFallback({
      verbose: true,
      index: '/',
    }),
    private compressor = compression({
      level: 9,
    }),
  ) {
    this.config = new CfgLoader(this.env, this.ssl).load();
    this.port = this.port || this.config.Port || 3000;
    this.staticFiles = express.static('public', {
      maxAge: this.config.Cache.MaxAge,
    });
    this.bootstrap()
      .then(() => {
        this.app
          .use(this.log)
          .use(this.compressor)
          .use(this.h5history)
          .use(this.staticFiles);

        this.setViewEngine('ejs');
        // this.setConnectSession();
      })
      .then(() => this.start(this.port))
      .then(() => {
        if (module.hot) {
          module.hot.accept();
          module.hot.dispose(() => this.app.close());
        }
      });
  }

  private async bootstrap() {
    this.app = await NestFactory.create<NestExpressApplication>(AppModule, {
      bodyParser: true,
      cors: true,
      httpsOptions: this.config.SSL,
    });
  }

  private setViewEngine(view: string) {
    this.app.set('views', 'public');
    this.app.set('view engine', view);
    this.app.setViewEngine('html');
  }

  private setConnectSession() {
    const MongoStore = connectMongo(session);

    this.app.use(
      session({
        secret: this.config.Session.Secret,
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: this.config.Session.MaxAge, httpOnly: false },
        store: new MongoStore({
          mongooseConnection: MongoConnect,
        }),
      }),
    );
  }

  public async start(port?: number) {
    await this.app.listen(port);
  }
}

const commandArgs = new CommandArgvParser();
const isDevMode = commandArgs.get('dev') || !commandArgs.get('prod');
const a = new Application(
  isDevMode ? ServerEnvironment.DEV : ServerEnvironment.PROD,
  commandArgs.get('https') as boolean,
  parseInt(commandArgs.get('port') as string, 10),
);
