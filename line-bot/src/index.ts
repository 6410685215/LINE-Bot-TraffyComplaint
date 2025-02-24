// Import all dependencies, mostly using destructuring for better view.
import {
  ClientConfig,
  MessageAPIResponseBase,
  messagingApi,
  middleware,
  MiddlewareConfig,
  webhook,
  HTTPFetchError,
} from '@line/bot-sdk';
import express, { Application, Request, Response } from 'express';
import { defaultMessage } from './handlers/default-message';
import dotenv from 'dotenv';
dotenv.config();

// Setup all LINE client and Express configurations.
const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
};

const middlewareConfig: MiddlewareConfig = {
  channelSecret: process.env.CHANNEL_SECRET || '',
};

const PORT = process.env.PORT || 3000;

// Create a new LINE SDK client.
const client = new messagingApi.MessagingApiClient(clientConfig);

// Create a new Express application.
const app: Application = express();

// Keywords for calling Traffy Fondue
const triggerWords = ["traffy", "fondue", "traffy fondue", "traffyfondue"];
const isTriggerWord = (text: string): boolean => {
  return triggerWords.includes(text.trim().toLowerCase());
};
const isSelfMention = (mention: webhook.Mentionee): boolean => {
  return mention.type === 'user' && (mention.isSelf ?? false);
};
// Function handler to receive the text.
const textEventHandler = async (event: webhook.Event): Promise<MessageAPIResponseBase | undefined> => {
  // Process all variables here.

  // Check if for a text message
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }

  // Check mentions and trigger words.
  if (!event.message.mention?.mentionees?.some(isSelfMention) && !isTriggerWord(event.message.text)) {
    return;
  }

  // Process all message related variables here.

  // Check if message is replicable
  if (!event.replyToken) return;

  // Create a new message.
  // Reply to the user.
  await client.replyMessage({
    replyToken: event.replyToken,
    messages: [defaultMessage(event)],
  });
};

// Register the LINE middleware.
// As an alternative, you could also pass the middleware in the route handler, which is what is used here.
// app.use(middleware(middlewareConfig));

// Route handler to receive webhook events.
// This route is used to receive connection tests.
app.get(
  '/bot/',
  async (_: Request, res: Response): Promise<Response> => {
    return res.status(200).json({
      status: 'success',
      message: 'Connected successfully!',
    });
  }
);

// This route is used for the Webhook.
app.post(
  '/bot/callback',
  middleware(middlewareConfig),
  async (req: Request, res: Response): Promise<Response> => {
    const callbackRequest: webhook.CallbackRequest = req.body;
    const events: webhook.Event[] = callbackRequest.events!;

    try {
      await Promise.all(
        events.map(async (event: webhook.Event) => {
          await textEventHandler(event);
        })
      );
      return res.status(200).json({ status: 'success' });
    } catch (err: unknown) {
      if (err instanceof HTTPFetchError) {
        console.error(err.status);
        console.error(err.headers.get('x-line-request-id'));
        console.error(err.body);
      } else if (err instanceof Error) {
        console.error(err);
      }
      return res.status(500).json({ status: 'error' });
    }
  }
);

// Create a server and listen to it.
app.listen(PORT, () => {
  console.log(`Application is live and listening on port ${PORT}`);
});
