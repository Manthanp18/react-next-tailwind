import {  ObjectID } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticPropsContext } from 'next'
import {ConnectToDatabase} from '../../util/database';




import MeetupDetail from '../../components/meetups/MeetupDetail';







function MeetupDetails({image, title, address, description}:{image:string,title:string, address:string, description:string}) {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <MeetupDetail
        image={image}
        title={title}
        address={address}
        description={description}
      />
    </Fragment>
  );
}




export const getStaticPaths: GetStaticPaths = async () => {
  const {db} = await ConnectToDatabase();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find( { _id: 1 }).toArray();



  return {
    fallback: 'blocking',
    paths: meetups.map((meetup:any) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context:GetStaticPropsContext | any) {
  // fetch data for a single meetup

  const {meetupId} = context.params;

  const {db} = await ConnectToDatabase();
 

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectID(meetupId)
  });

  

  return {
    props: { 
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
