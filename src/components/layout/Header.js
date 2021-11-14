import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../../store/actions/authActions';

export default function Header(props) {
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(logout());
    };

    return (
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box sticky top-0 z-50">
            <div className="flex-none px-2 mx-2">
                <span className="text-lg font-bold">
                    BOM APP
                </span>
            </div>
            <div className="flex-1 px-2 mx-2">
                <div className="items-stretch hidden lg:flex">
                    <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
                        Home
                    </Link>
                </div>
            </div>
            {
                auth.username ?
                    <>
                        <div className="flex-none">
                            <Link to="/component" className="btn btn-ghost btn-sm rounded-btn">
                                Components
                            </Link>
                        </div>
                        <div className="flex-none">
                            <Link to="/bom" className="btn btn-ghost btn-sm rounded-btn">
                                BOM
                            </Link>
                        </div>
                        <div className="dropdown dropdown-left dropdown-hover">
                            <div tabIndex="0" className="avatar placeholder">
                                <div className="bg-neutral-focus text-neutral-content rounded-full w-10 h-10">
                                    <button className="text-1xl">{auth.username.charAt(0).toUpperCase()}</button>
                                </div>
                            </div>
                            <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                                <li className="mb-1">
                                    <span className="text-lg font-bold">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {auth.username}
                                    </span>
                                </li>
                                <li className="mb-3">
                                    <span className="text-base">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {auth.email}
                                    </span>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="btn btn-sm rounded-btn">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </>
                    :
                    <>
                        <div className="flex-none">
                            <Link to="/register" className="btn btn-ghost btn-sm rounded-btn">
                                Register
                            </Link>
                        </div>
                        <div className="flex-none">
                            <Link to="/login" className="btn btn-ghost btn-sm rounded-btn">
                                Login
                            </Link>
                        </div>
                    </>
            }
        </div>

    );
}