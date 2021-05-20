import MeetupItem from './MeetupItem';

export interface Meetup{
  id:string,
  image:string,
  title:string,
  address:string
}
function MeetupList({meetups}:{meetups:Meetup[]}) {
  return (
    <ul className="list-none m-4 p-6 sm:grid md:grid-cols-2 xl:grid-cols-3">
      {meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          
        />
      ))}
    </ul>
  );
}

export default MeetupList;
