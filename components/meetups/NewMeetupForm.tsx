import { useRef, FormEvent } from 'react';

import Card from '../ui/Card';


function NewMeetupForm(props:any) {
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  function submitHandler(event:FormEvent) {
    event.preventDefault();
    const enteredTitle = titleInputRef.current!.value;
    const enteredImage = imageInputRef.current!.value;
    const enteredAddress = addressInputRef.current!.value;
    const enteredDescription = descriptionInputRef.current!.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
    
  }

  return (
    <Card >
      <form className="p-4" onSubmit={submitHandler}>
        <div className="mb-2">
          <label className="block font-bold mb-2" htmlFor='title'>Meetup Title</label>
          <input className="block rounded border-solid p-4 w-full border-4 border-black-500"type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className="mb-2">
          <label  className="block font-bold mb-2" htmlFor='image'>Meetup Image</label>
          <input className="block rounded border-solid p-4 w-full border-4 border-black-500"type='url' required id='image' ref={imageInputRef} />
        </div>
        <div className="mb-2">
          <label className="block font-bold mb-2" htmlFor='address'>Address</label>
          <input className="block rounded border-solid p-4 w-full border-4 border-black-500" type='text' required id='address' ref={addressInputRef} />
        </div>
        <div className="mb-2">
          <label className="block font-bold mb-2" htmlFor='description'>Description</label>
          <textarea className="block rounded border-solid p-4 w-full border-4 border-black-500"
            id='description'
            required
           
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className="mt-4 text-right">
          <button className="cursor-pointer bg-red-700 text-white py-4 px-6 rounded font-bold hover:bg-red-300 active:bg-red-300 ">Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
