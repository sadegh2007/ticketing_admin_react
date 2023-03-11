import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import { IsLogin, LoginUser } from "../services/AuthService"
import {notify} from "../utilities/index.js";

const Login = () => {
    const navigate = useNavigate();
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (IsLogin()) {
            navigate('/dashboard')
        }
    })

    const login = async (e) => {
        e.preventDefault();

        if (mobile.length !== 11) {
            return notify("لطفا موبایل خود را به صورت صحیح وارد کنید.")
        }

        if (password.length < 6) {
            return notify("کلمه عبور حداقل ۶ کلمه می باشد.")
        }

        await LoginUser(mobile, password);
        navigate('/dashboard')
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
            <div className="card w-25">
                <div className="card-body">
                    <h2 className="text-center">ورود به مدیریت</h2>

                    <form onSubmit={login} action="#" method="post">
                        <div className="form-group">
                            <label className="form-label" htmlFor="mobile">موبایل</label>
                            <input onInput={(e) => setMobile(e.target.value)} dir="ltr" id="mobile" type="tel" className="form-control" maxLength={11} minLength={11}/>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="mobile">کلمه عبور</label>
                            <input onInput={(e) => setPassword(e.target.value)} dir="ltr" id="password" type="password" className="form-control" minLength={6}/>
                        </div>

                        <div className="form-group mt-4 text-center">
                            <button type="submit">ورود</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;