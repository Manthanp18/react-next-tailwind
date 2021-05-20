import MainNavigation from './MainNavigation';
import { ReactNode } from "react"

interface Props{
  children:ReactNode
}
function Layout (props:Props) {
  return (
    <div>
      <MainNavigation />
      <main className="m-auto max-w-3xl m-12">{props.children}</main>
    </div>
  );
}

export default Layout;
