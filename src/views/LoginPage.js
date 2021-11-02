import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/authActions';

export default function LoginPage(props) {
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(user.username, user.password)).then(() => {
            props.history.push("/bom");
        });
    };

    return (
        <>
            <div className="w-full flex justify-center">
                <form className="w-full md:w-1/3 rounded-lg">
                    <h2 className="text-3xl text-center mb-4">Login</h2>
                    <div className="p-10 card bg-base-200">
                        <div className="form-control">
                            <label className="label">
                                Username
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </label>
                            <input id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} type="text" className="input" />
                            <label className="label">
                                Password
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-lock" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <rect x="5" y="11" width="14" height="10" rx="2"></rect>
                                    <circle cx="12" cy="16" r="1"></circle>
                                    <path d="M8 11v-4a4 4 0 0 1 8 0v4"></path>
                                </svg>
                            </label>
                            <input id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" className="input" />
                            <button onClick={handleLogin} className="btn btn-primary mt-4">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}