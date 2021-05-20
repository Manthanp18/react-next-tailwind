import Link from 'next/link';


function MainNavigation () {
  

  return (
    <header className="w-full h-20 flex items-center justify-between bg-red-200 px-10 py-10">
      <div className="text-2xl text-white font-bold">React Meetups</div>
      <nav>
        <ul className="list-none m-5 p-10 flex items-baseline">
          <li className="ml-12">
            <Link href='/' >
              <a className='no-underline text-2xl text-pink-500 hover:underline active active:bg-white-700'>All Meetups</a>
            </Link>
          </li>
          <li className="ml-12">
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
