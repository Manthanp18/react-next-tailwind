import React from "react";

interface MeetupDetailProp {
  image: string,
  title: string,
  address: string | number,
  description: string
}

function MeetupDetail (props:MeetupDetailProp) {
  return (
    <section className="text-center">
      <img className="w-full max-h-80"
        src={props.image}
        alt={props.title}
      />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}

export default MeetupDetail;
