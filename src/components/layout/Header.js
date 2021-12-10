import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../../store/actions/authActions';

import { FiUser, FiMail } from 'react-icons/fi';
import { GiMicrochip } from 'react-icons/gi';

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
                <GiMicrochip className="mr-2" size={40} />
                <span className="text-lg font-bold">
                    BOM APP
                </span>
            </div>
            <div className="flex-1 px-2 mx-2">
                {
                    !auth.username &&
                    <div className="items-stretch hidden lg:flex">
                        <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
                            Home
                        </Link>
                    </div>
                }
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
                                        <FiUser className="mr-2" size={20} />
                                        {auth.username}
                                    </span>
                                </li>
                                <li className="mb-3">
                                    <span className="text-base">
                                        <FiMail className="mr-2" size={20} />
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