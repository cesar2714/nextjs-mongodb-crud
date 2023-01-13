import {Navbar} from './Navbar'

export const Layaout = ({children}) => {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}