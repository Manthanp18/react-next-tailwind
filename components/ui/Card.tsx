import { ReactNode } from "react"

interface Props{
  children:ReactNode
}

function Card(props:Props) {
  return <div className="bg-white rounded shadow-xl ">{props.children}</div>;
}

export default Card;
