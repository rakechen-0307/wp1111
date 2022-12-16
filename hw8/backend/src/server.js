import { createPubSub, createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'node:http'
import * as fs from 'fs'

import ChatBoxModel from './models/chatbox';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import ChatBox from './resolvers/ChatBox'

/*
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
*/

const pubsub = createPubSub()

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
      ChatBox
    },
  }),
  context: {
    ChatBoxModel,
    pubsub,
  },
  graphqlEndpoint: '/',
});

const server = createServer(yoga)

export default server
