
import type { NextApiRequest, NextApiResponse } from 'next'
import {ConnectToDatabase} from '../../util/database';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req:NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;

    const {db} = await ConnectToDatabase();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);


    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;
