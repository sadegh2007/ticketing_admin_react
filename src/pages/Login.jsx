import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import { IsLogin, LoginUser } from "../services/AuthService"
import {notify} from "../utilities/index.js";
import Card from "../components/global/Card.jsx";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (IsLogin()) {
            navigate('/admin/dashboard')
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

            await LoginUser(mobile, password);
            navigate('/admin/dashboard')
        } catch (e) {

        }

        setLoading(false);
    }

    return (
        <div className="flex justify-center items-center" style={{ height: '100vh', width: '100vw' }}>
            <Card withBorder={false} className=" rounded-xl shadow-xl w-1/5">
                <div className="card-body p-4">
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
                </div>
            </Card>
        </div>
    )
}

export default Login;