import { ISidebar } from "./types"
import "./Sidebar.scss"

export const Sidebar = (props: ISidebar) => {
  const { header, children } = props;
  return (
    <div className="side-bar p-2">
      {header}
      {children}
    </div>
  )
}
