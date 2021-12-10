import { useDispatch } from 'react-redux';
import { register as registerUser } from '../store/actions/authActions';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import FormError from "../components/common/FormError";

import { FiLock, FiUser, FiMail } from 'react-icons/fi';


const schema = yup.object({
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    passwordConf: yup.string().required().when(['password'], (password, sch) => {
        return sch.test({
            test: passwordConf => passwordConf === password,
            message: "Password Confirmation must be equal to Password."
        })
    })
}).required();

export default function RegisterPage(props) {
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleRegister = (data) => {
        dispatch(registerUser(data.username, data.password, data.email)).then(() => {
            props.history.push("/login");
        });
    };

    return (
        <div className="w-full flex justify-center">
            <form className="w-full md:w-1/3 rounded-lg">
                <h2 className="header text-center mb-4">Register</h2>
                <div className="p-10 card bg-base-200">
                    <div className="form-control">
                        <label className="label">
                            Username
                            <FiUser size={20} />
                        </label>
                        <input {...register("username")} id="username" type="text" className="input" />
                        <FormError message={errors.username?.message} />
                        <label className="label">
                            Email
                            <FiMail size={20} />
                        </label>
                        <input {...register("email")} id="email" type="email" className="input" />
                        <FormError message={errors.email?.message} />
                        <label className="label">
                            Password
                            <FiLock size={20} />
                        </label>
                        <input {...register("password")} id="password" type="password" className="input" />
                        <FormError message={errors.password?.message} />
                        <label className="label">
                            Password Confirmation
                            <FiLock size={20} />
                        </label>
                        <input {...register("passwordConf")} id="passwordConf" type="password" className="input" />
                        <FormError message={errors.passwordConf?.message} />
                        <button onClick={handleSubmit(handleRegister)} className="btn btn-primary mt-4">Register</button>
                    </div>
                </div>
            </form>
        </div>
    );
}