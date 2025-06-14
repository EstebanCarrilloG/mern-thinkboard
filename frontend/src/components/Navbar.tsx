import { PlusIcon } from "lucide-react"
import { Link } from "react-router"

const Navbar = () => {
  return (
    <header className='bg-base-300 border-e border-basecontent/10'>
        <div className='mx-auto px-3 py-2 max-w-6xl'>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Title</h1>
                <Link to={"/create"} className="btn btn-primary"><PlusIcon/>Add note</Link>

            </div>

        </div>
    </header>
  )
}

export default Navbar