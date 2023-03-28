import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {GetTenant, IsLogin, LoginUser} from "../services/AuthService"
import {notify} from "../utilities/index.js";
import Card from "../components/global/Card.jsx";
import CustomSelect from "../components/SelectBox/CustomSelect.jsx";
import {handleError} from "../services/GlobalService.js";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [currentTenant, setCurrentTenant] = useState();

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
        e.preventDefault();

        setLoading(true);

        try {

            if (mobile.length !== 11) {
                return notify("لطفا موبایل خود را به صورت صحیح وارد کنید.")
            }

            if (password.length < 6) {
                return notify("کلمه عبور حداقل ۶ کلمه می باشد.")
            }

            const {data} = await LoginUser(mobile, password);

            if (data.tenants.length > 1) {
                setTenants(data.tenants);

                setCurrentTenant({
                    value: data.tenants[0].id,
                    label: data.tenants[0].title,
                });
                return;
            }

            // navigate('/admin/dashboard');
            window.location.reload();
        } catch (e) {
            handleError(e.response);
        }

        setLoading(false);
    }

    const setTenant = () => {

    }

    return (
        <div className="flex justify-center items-center" style={{ height: '100vh', width: '100vw' }}>
            {
                tenants.length > 1
                    ? <Card withBorder={false} padding="p-4" className="rounded-xl shadow-xl w-full mx-8 md:mx-0 md:w-1/3 lg:w-1/4">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">انتخاب سرور</span>
                            </label>
                            <CustomSelect
                                value={currentTenant}
                                onSelect={setCurrentTenant}
                                placeholder="انتخاب سرور مورد نظر..."
                                options={tenants.map(x => { return {value: x.id, label: x.title} })}
                            />
                        </div>

                    <div className="text-center">
                        <button onClick={setTenant} className="btn px-8 btn-success text-white mt-4">ورود</button>
                    </div>


                </Card>
                    : <Card withBorder={false} padding="p-4" className=" rounded-xl shadow-xl w-full mx-8 md:mx-0 md:w-1/3 lg:w-1/4">
                        <h2 className="text-center mb-4">ورود به مدیریت</h2>

                        <form onSubmit={login} action="#" method="post">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">موبایل</span>
                                </label>
                                <input style={{height: '33.5px'}} value={mobile} onInput={(e) => setMobile(e.target.value)} type="text" placeholder="موبایل..." className="input input-sm input-bordered rounded-sm"/>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">کلمه عبور</span>
                                </label>
                                <input style={{height: '33.5px'}} value={password} onInput={(e) => setPassword(e.target.value)} type="password" placeholder="کلمه عبور..." className="input input-sm input-bordered rounded-sm"/>
                            </div>

                            <div className="form-group mt-4 text-center">
                                <button disabled={loading} className="btn btn-success text-white" type="submit">ورود</button>
                            </div>
                        </form>
                    </Card>
            }

        </div>
    )
}

export default Login;