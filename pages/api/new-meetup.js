import { MongoClient } from 'mongodb';
async function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body;
		const client = await MongoClient.connect(
			'mongodb+srv://arturczerwiak:Kz1GFygLSnuhFGh7@cluster0.tv7bi.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
		);

		const db = client.db();
		const meetupsCollection = db.collection('meetups');

		const result = await meetupsCollection.insertOne(data);
		client.close();
		res.status(201).json({ message: 'Meetup inserted!' });
	}
}

export default handler;
// USER: arturczerwiak
// PASS: Kz1GFygLSnuhFGh7
