import { useRouter } from 'next/router';

import Card from '../ui/Card';

interface MeetupItemProp{
  id:string,
  image: string,
  title:string,
  address: string
}

function MeetupItem(props:MeetupItemProp) {
  const router = useRouter();

  function showDetailsHandler() {
    router.push('/' + props.id);
  }

  return (
    <li className="my-20 mx-10">
      <Card>
        <div className="w-full h-80 overflow-hidden rounded-tr-md rounded-tl-md">
          <img className="w-full object-cover "src={props.image} alt={props.title} />
        </div>
        <div className="text-center p-4">
          <h3 className='text-xl text-black transition-all duration-100 ease-in-out hover:font-bold'>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className="p-6 text-center ">
          <button className="cursor-pointer text-red-600 border-solid border-2 border-red-500 hover:bg-pink-200 py-2 px-4 rounded-2xl " onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
