import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta
					name="description"
					content="Browse a huge list of highly active React meetups!"
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
}

// //get serverSideProps generates on every request (better choice if data are changing frequently)
// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;

// 	//fetch data from an API
// 	return {
// 		props: { meetups: DUMMY_MEETUPS },
// 	};
// }

//getStaticProps is used during build process to fetch data and generate static page after deployment
export async function getStaticProps() {
	//fetch data from an API
	const client = await MongoClient.connect(
		'mongodb+srv://arturczerwiak:Kz1GFygLSnuhFGh7@cluster0.tv7bi.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
	);

	const db = client.db();
	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find().toArray();
	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 1, //how often (seconds) data will be refetched (and page regenereted with new data)
	};
}

export default HomePage;
