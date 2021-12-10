import { useDispatch } from 'react-redux';
import { login } from '../store/actions/authActions';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import FormError from "../components/common/FormError";

import { FiLock, FiUser } from 'react-icons/fi';

const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
}).required();

export default function LoginPage(props) {
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    });

    const handleLogin = (data) => {
        dispatch(login(data.username, data.password)).then(() => {
            props.history.push("/bom");
        });
    };

    return (
        <>
            <div className="w-full flex justify-center">
                <form className="w-full md:w-1/3 rounded-lg">
                    <h2 className="header text-center mb-4">Login</h2>
                    <div className="p-10 card bg-base-200">
                        <div className="form-control">
                            <label className="label">
                                Username
                                <FiUser size={20} />
                            </label>
                            <input {...register("username")} id="username" type="text" className="input" />
                            <FormError message={errors.username?.message} />
                            <label className="label">
                                Password
                                < FiLock size={20} />
                            </label>
                            <input {...register("password")} id="password" type="password" className="input" />
                            <FormError message={errors.password?.message} />
                            <button onClick={handleSubmit(handleLogin)} className="btn btn-primary mt-4">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}