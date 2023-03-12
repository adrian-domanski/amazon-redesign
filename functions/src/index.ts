import * as functions from 'firebase-functions';
import express, { Request, Response } from 'express';
import cors from 'cors';

const stripe = require('stripe')(
  'sk_test_51MkSMYAqVzAZlI7C7d2bT6XFn5WR1S10gThscQ685gGh1LvcjHleiHoPBvnu95OHCMmeYCkuLcLg9KPZVzy8xff700abDLn1Fb'
);

// API
const app = express();

// App config
app.use(cors());
app.use(express.json());

// Middlewares

// Listen command
exports.api = functions.https.onRequest(app);

// API routes
app.get('/', (req: Request, res: Response) =>
  res.status(200).send('hello world')
);

app.post('/payments/create', async (req: Request, res: Response) => {
  const total = req.query.total;

  console.log('Payment Request Received BOOM!!! for this amount >>> ', total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: 'usd',
  });

  // OK - Created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
