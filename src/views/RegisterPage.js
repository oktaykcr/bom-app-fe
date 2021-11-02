import { useDispatch } from 'react-redux';
import { useState } from "react";
import { register } from '../store/actions/authActions';

export default function RegisterPage(props) {
    const dispatch = useDispatch();

    const [registedUser, setRegisteredUser] = useState({
        username: "",
        password: "",
        passwordConf: "",
        email: ""
    });

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(register(registedUser.username, registedUser.password, registedUser.email)).then(() => {
            props.history.push("/login");
        });
    };

    return (
        <div className="w-full flex justify-center">
            <form className="w-full md:w-1/3 rounded-lg">
                <h2 className="text-3xl text-center mb-4">Register</h2>
                <div className="p-10 card bg-base-200">
                    <div className="form-control">
                        <label className="label">
                            Username
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </label>
                        <input id="username" value={registedUser.username} onChange={(e) => setRegisteredUser({ ...registedUser, username: e.target.value })} type="text" className="input" />
                        <label className="label">
                            Email
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                                <polyline points="3 7 12 13 21 7"></polyline>
                            </svg>
                        </label>
                        <input id="email" value={registedUser.email} onChange={(e) => setRegisteredUser({ ...registedUser, email: e.target.value })} type="email" className="input" />
                        <label className="label">
                            Password
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-lock" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <rect x="5" y="11" width="14" height="10" rx="2"></rect>
                                <circle cx="12" cy="16" r="1"></circle>
                                <path d="M8 11v-4a4 4 0 0 1 8 0v4"></path>
                            </svg>
                        </label>
                        <input id="password" value={registedUser.password} onChange={(e) => setRegisteredUser({ ...registedUser, password: e.target.value })} type="password" className="input" />
                        <label className="label">
                            Password Confirmation
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-lock" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <rect x="5" y="11" width="14" height="10" rx="2"></rect>
                                <circle cx="12" cy="16" r="1"></circle>
                                <path d="M8 11v-4a4 4 0 0 1 8 0v4"></path>
                            </svg>
                        </label>
                        <input id="passwordConf" value={registedUser.passwordConf} onChange={(e) => setRegisteredUser({ ...registedUser, passwordConf: e.target.value })} type="password" className="input" />
                        <button onClick={handleRegister} className="btn btn-primary mt-4">Register</button>
                    </div>
                </div>
            </form>
        </div>
    );
}