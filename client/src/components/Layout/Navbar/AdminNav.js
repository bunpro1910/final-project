
import Navbar from '../../Navbar'
import SearchBar from '../../Searchbar'
import { Outlet } from 'react-router-dom';
function Idea({ user }) {
    return (
        <>
            <Navbar user={user}></Navbar>
            <Outlet />
        </>
    )

}

export default Idea;
