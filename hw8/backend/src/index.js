<<<<<<< HEAD
import server from './server'

/*
import http from 'http'
import express from 'express'
import dotenv from 'dotenv-defaults'
import mongoose from 'mongoose'
import WebSocket from 'ws'
*/

import mongo from './mongo'

/*
import wsConnect from './wsConnect'
*/

mongo.connect();

/*
const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
const db = mongoose.connection

db.once('open', () => {
    console.log("MongoDB connected!")
    wss.on('connection', (ws) => {
        ws.box = ''
        ws.onmessage = wsConnect.onMessage(ws)
    })
})
*/

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})
=======
import { createPubSub, createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import { useServer } from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws'
import * as fs from 'fs'
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';

const pubsub = createPubSub();

const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync(
      './src/schema.graphql',
      'utf-8'
    ),
    resolvers: {
      Query,
      Mutation,
      Subscription,
      User,
      Post,
      Comment,
    },
  }),
  context: {
    db,
    pubsub,
  },
  //  graphqlEndpoint: '/',   // uncomment this to send the app to: 4000/
  graphiql: {
    subscriptionsProtocol: 'WS',
  },
});

const server = createServer(yoga)

const wsServer = new WebSocketServer({
  server: server,
  path: yoga.graphqlEndpoint,
})

useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload
        })

      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe
        }
      }

      const errors = validate(args.schema, args.document)
      if (errors.length) return errors
      return args
    },
  },
  wsServer,
)

const port = process.env.PORT || 4000;
server.listen({port}, () => {
  console.log(`The server is up on port ${port}!`);
});
>>>>>>> 918571b6dc031f721c84cf67257a094c4a7f7316
