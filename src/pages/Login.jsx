import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {GetTenant, IsLogin, LoginUser, SetCurrentTenant} from "../services/AuthService"
import {notify} from "../utilities/index.js";
import Card from "../components/global/Card.jsx";
import CustomSelect from "../components/SelectBox/CustomSelect.jsx";
import {handleError} from "../services/GlobalService.js";
import {ReactSVG} from "react-svg";
import {useForm} from "react-hook-form";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [currentTenant, setCurrentTenant] = useState();
    const [rememberMe, setRememberMe] = useState(true);

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "all",
        criteriaMode: "all",
    });

    const [tenants, setTenants] = useState([]);

    useEffect(() => {
        if (IsLogin()) {
            const currentTenant = GetTenant();

            navigate(`/${currentTenant}/admin/dashboard`, {
                replace: true,
            });
            window.location.reload();
        }
    })

    const login = async (e) => {
        // e.preventDefault();

        try {
            if (mobile.length !== 11) {
                return notify("لطفا موبایل خود را به صورت صحیح وارد کنید.")
            }

            if (password.length < 6) {
                return notify("کلمه عبور حداقل ۶ کلمه می باشد.")
            }

            setLoading(true);

            const {data} = await LoginUser(mobile, password, rememberMe);

            if (data.tenants.length === 0) {
                window.location.reload();
                return;
            }

            setTenants(data.tenants);

            setCurrentTenant({
                value: data.tenants[0].id,
                label: data.tenants[0].title,
            });
            // navigate('/admin/dashboard');
        } catch (e) {
            setLoading(false);
            if (e.response) {
                handleError(e.response);
            } else {
                handleError(e);
            }
        }

        setLoading(false);
    }

    return (
        <div className="login">
            <div className="flex bg-white items-center justify-center w-full md:w-1/3">
                {
                    tenants.length > 1
                        ? <TenantSelector
                            tenants={tenants}
                            initialTenant={{
                                value: tenants[0].id,
                                label: tenants[0].title,
                            }}
                        />
                        : <div className="w-3/4">
                            <h2 className="text-xl font-bold mb-4">ورود به مدیریت</h2>

                            <form onSubmit={handleSubmit(login)} action="#" method="post">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            موبایل <span className="text-red-600">*</span>
                                        </span>
                                    </label>
                                    <input value={mobile}
                                           aria-invalid={errors.mobile ? "true" : "false"}
                                           {...register('mobile', { required: true, minLength: 11, maxLength: 11})}
                                           onInput={(e) => setMobile(e.target.value)} type="text"
                                           placeholder="موبایل خود را وارد کنید"
                                           className={`input input-md input-bordered rounded-md focus:outline-none placeholder-gray-500 ${errors.mobile && 'input-error'}`}/>

                                    <span className="text-error text-xs mt-1 mr-1">
                                        {
                                            errors.mobile?.type === 'required' && 'شماره موبایل الزامیست.'
                                        }
                                        {
                                            errors.mobile?.type === 'minLength' && 'شماره موبایل باید حداقل 11 رقم باشد.'
                                        }
                                        {
                                            errors.mobile?.type === 'pattern' && 'شماره موبایل وارد شده اشتباه است.'
                                        }
                                    </span>
                                </div>

                                <div className="form-control mt-2">
                                    <label className="label">
                                        <span className="label-text">
                                            کلمه عبور <span className="text-red-600">*</span>
                                        </span>
                                    </label>
                                    <input value={password}
                                           aria-invalid={errors.password ? "true" : "false"}
                                           {...register('password', {required: true, minLength: 6})}
                                           onInput={(e) => setPassword(e.target.value)} type="password"
                                           placeholder="کلمه عبور خود را وارد کنید"
                                           className={`input input-md input-bordered rounded-md focus:outline-none placeholder-gray-500 ${errors.mobile && 'input-error'}`}/>

                                    <span className="text-error text-xs mt-1 mr-1">
                                        {
                                            errors.password?.type === 'required' && 'کلمه عبور الزامیست.'
                                        }
                                        {
                                            errors.password?.type === 'minLength' && 'کلمه عبور باید حداقل 6 رقم باشد.'
                                        }
                                        {
                                            errors.password?.type === 'pattern' && 'کلمه عبور وارد شده اشتباه است.'
                                        }
                                    </span>
                                </div>

                                <div className="form-control mt-4">
                                    <label className="cursor-pointer flex items-center">
                                        <input checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} type="checkbox" className="checkbox"/>
                                        <span className="label-text mr-2">مرا به خاطر بسپار</span>
                                    </label>
                                </div>

                                <div className="form-group mt-6 text-center">
                                    <button disabled={loading} className="w-full rounded-md btn text-white"
                                            type="submit">
                                        <ReactSVG src="/src/assets/svgs/login.svg"/>
                                        <span className="mr-1">ورود</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                }
            </div>
            <div className="login-side p-4 text-gray-300 hidden md:flex items-center justify-center bg-neural-700 w-2/3">
                <img src="/src/assets/characters/login-side.png"/>
            </div>
        </div>
    )
}

const TenantSelector = (
    {
        tenants,
        initialTenant = {},
    }) => {
    const [currentTenant, setCurrentTenant] = useState(initialTenant);

    const setTenant = () => {
        SetCurrentTenant(currentTenant.value);
        window.location.reload();
    }

    return (
        <div className="w-3/4">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">انتخاب سرور</span>
                </label>
                <CustomSelect
                    value={currentTenant}
                    onSelect={setCurrentTenant}
                    placeholder="انتخاب سرور مورد نظر..."
                    options={tenants.map(x => {
                        return {value: x.id, label: x.title}
                    })}
                />
            </div>

            <div className="text-center">
                <button onClick={setTenant} className="btn px-8 btn-success text-white mt-4">ورود</button>
            </div>
        </div>
    )
}

export default Login;