import {ReactSVG} from "react-svg";
import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {appContext} from "../../context/AppContext.js";
import {CreateCategory, UpdateCategory} from "../../services/CategoryApiService.js";
import {handleError} from "../../services/GlobalService.js";
import {CreateUser, UpdateUser} from "../../services/UserService.js";

const UserModal = ({user, show, closeModal}) => {
    const [name, setName] = useState('');
    const [family, setFamily] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const { register, formState: { errors } } = useForm();
    const {showMainLoader, toggleMainLoader} = useContext(appContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setFamily(user.family);
            setUsername(user.userName);
            setEmail(user.email);
        }
    }, [user]);

    const saveCategory = () => {
        toggleMainLoader(true);

        const data = {
            name: name,
            family: family,
            userName: username,
            email: email,
        };

        if (user) {
            UpdateUser(user.id, data)
                .then(res => {
                    toggleMainLoader(false);
                    closeModal(true);
                })
                .catch(err => {
                    toggleMainLoader(false);
                    handleError(err.response);
                });
        }
        else {
            CreateUser(data)
                .then(res => {
                    toggleMainLoader(false);
                    closeModal(true);
                })
                .catch(err => {
                    toggleMainLoader(false);
                    handleError(err.response);
                });
        }
    }

  return (
      <div className={`modal ${show ? 'modal-open' : ''} overflow-visible`}>
          <div className="modal-box rounded relative" style={{overflow: 'initial'}}>
              <button onClick={() => {
                  setName('');
                  setFamily('');
                  setUsername('');
                  setEmail('');

                  closeModal(false)
              }} className="btn btn-sm btn-square btn-svg text-gray-600 rounded btn-outline absolute left-2 top-2">
                  <ReactSVG src="/src/assets/svgs/X.svg" />
              </button>
              <h3 className="text-lg font-bold">
                  { user ? 'ویرایش' : 'ایجاد' } کاربر
              </h3>

              <div className="form grid grid-cols-2 gap-2">
                  <div className="form-control">
                      <label className="label">
                          <span className="label-text">نام</span>
                      </label>
                      <input
                          type='text'
                          placeholder= 'نام...'
                          {...register('name', { required: true })}
                          value={name}
                          onInput={(e) => setName(e.target.value)}
                          style={{height: '38px'}}
                          className={`input input-bordered rounded focus:outline-none text-sm w-full placeholder-gray-600 ${errors.title && ''}`}
                      />
                  </div>

                  <div className="form-control">
                      <label className="label">
                          <span className="label-text">نام خانوادگی</span>
                      </label>
                      <input
                          type='text'
                          placeholder= 'نام خانوادگی...'
                          {...register('family', { required: true, pattern: /(09)\d{9}/ })}
                          value={family}
                          onInput={(e) => setFamily(e.target.value)}
                          style={{height: '38px'}}
                          className={`input input-bordered rounded focus:outline-none text-sm w-full placeholder-gray-600 ${errors.title && ''}`}
                      />
                  </div>

                  <div className="form-control">
                      <label className="label">
                          <span className="label-text">موبایل</span>
                      </label>
                      <input
                          type='tel'
                          placeholder= 'موبایل...'
                          {...register('username', { required: true, minLength: 11, maxLength: 11 })}
                          value={username}
                          onInput={(e) => setUsername(e.target.value)}
                          style={{height: '38px'}}
                          className={`input input-bordered rounded focus:outline-none text-sm w-full placeholder-gray-600 ${errors.title && ''}`}
                      />
                  </div>

                  <div className="form-control">
                      <label className="label">
                          <span className="label-text">ایمیل</span>
                      </label>
                      <input
                          type='email'
                          placeholder= 'ایمیل...'
                          {...register('email', { required: true })}
                          value={email}
                          onInput={(e) => setEmail(e.target.value)}
                          style={{height: '38px'}}
                          className={`input input-bordered rounded focus:outline-none text-sm w-full placeholder-gray-600 ${errors.title && ''}`}
                      />
                  </div>
              </div>

              <div className="modal-action">
                  <button disabled={!name || name.length === 0 || !family || family.length === 0 || !username || username.length === 0} onClick={saveCategory} className="btn rounded btn-success text-white">ثبت</button>
              </div>
          </div>
      </div>
  );
}

export default UserModal;