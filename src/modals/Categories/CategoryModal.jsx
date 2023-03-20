import {ReactSVG} from "react-svg";
import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {appContext} from "../../context/AppContext.js";
import {CreateCategory, UpdateCategory} from "../../services/CategoryApiService.js";
import {handleError} from "../../services/GlobalService.js";

const CategoryModal = ({category, show, closeModal}) => {
    const [title, setTitle] = useState('');
    const { register, formState: { errors } } = useForm();
    const {showMainLoader, toggleMainLoader} = useContext(appContext);

    useEffect(() => {
        if (category) {
            setTitle(category.title);
        }
    }, [category]);

    const saveCategory = () => {
        toggleMainLoader(true);

        if (category) {
            UpdateCategory(category.id, {title})
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
            CreateCategory({title})
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
                    { category ? 'ویرایش' : 'ایجاد' } دسته بندی
                </h3>

                <div className="form">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">عنوان</span>
                        </label>
                        <input
                            type='text'
                            placeholder= 'عنوان دسته بندی...'
                            {...register('title', { required: true })}
                            value={title}
                            onInput={(e) => setTitle(e.target.value)}
                            style={{height: '38px'}}
                            className={`input input-bordered rounded focus:outline-none text-sm w-full placeholder-gray-600 ${errors.title && ''}`}
                        />
                    </div>
                </div>

                <div className="modal-action">
                    <button disabled={!title || title.length === 0} onClick={saveCategory} className="btn rounded btn-success text-white">ثبت</button>
                </div>
            </div>
        </div>
    );
}

export default CategoryModal;