import {ReactSVG} from "react-svg";
import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {appContext} from "../../context/AppContext.js";
import {handleError} from "../../services/GlobalService.js";
import {CreateDepartment, UpdateDepartment} from "../../services/DepartmentApiService.js";

const DepartmentModal = ({department, show, closeModal}) => {
    const [title, setTitle] = useState('');
    const { register, formState: { errors } } = useForm();
    const {showMainLoader, toggleMainLoader} = useContext(appContext);

    useEffect(() => {
        if (department) {
            setTitle(department.title);
        }
    }, [department]);

    const saveDepartment = () => {
        toggleMainLoader(true);

        if (department) {
            UpdateDepartment(department.id, {title})
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
            CreateDepartment({title})
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
                    setTitle('');
                    closeModal(false)
                }} className="btn btn-sm btn-square btn-svg text-gray-600 rounded btn-outline absolute left-2 top-2">
                    <ReactSVG src="/src/assets/svgs/X.svg" />
                </button>
                <h3 className="text-lg font-bold">
                    { department ? 'ویرایش' : 'ایجاد' } دپارتمان
                </h3>

                <div className="form">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">عنوان</span>
                        </label>
                        <input
                            type='text'
                            placeholder= 'عنوان دپارتمان...'
                            {...register('title', { required: true })}
                            value={title}
                            onInput={(e) => setTitle(e.target.value)}
                            style={{height: '38px'}}
                            className={`input input-bordered rounded focus:outline-none text-sm w-full placeholder-gray-600 ${errors.title && ''}`}
                        />
                    </div>
                </div>

                <div className="modal-action">
                    <button disabled={!title || title.length === 0} onClick={saveDepartment} className="btn rounded btn-success text-white">ثبت</button>
                </div>
            </div>
        </div>
    );
}

export default DepartmentModal;