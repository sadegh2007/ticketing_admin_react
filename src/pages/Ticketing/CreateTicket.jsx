import Card from "../../components/global/Card.jsx";
import Breadcrumb from "../../components/global/Breadcrumb.jsx";
import {Controller, useForm} from "react-hook-form";
import {ReactSVG} from "react-svg";
import {appContext} from "../../context/AppContext.js";
import React, {useContext, useRef, useState} from "react";
import {CreateNewTicket, SendNewComment} from "../../services/TicketingApiService.js";
import {notify, strLimit} from "../../utilities/index.js";
import {constants} from "../../general/constants.js";
import {handleError} from "../../services/GlobalService.js";
import ServerSideSelect from "../../components/SelectBox/ServerSideSelect.jsx";
import ApiConstants from "../../general/ApiConstants.js";
import QuillEditor from "../../components/global/QuillEditor.jsx";
import {useNavigate} from "react-router-dom";
import Input from "../../components/global/Form/Input.jsx";

const CreateTicket = ({}) => {
    const {control, register, handleSubmit, formState: {errors}} = useForm();
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [files, setFiles] = useState([]);
    const {showMainLoader, toggleMainLoader} = useContext(appContext);
    const [users, setUsers] = useState(null);
    const navigate = useNavigate();

    let fileRef = useRef(null);
    const quillRef = useRef(null);

    const createTicket = () => {
        console.log(quillRef.current.getEditor().getText());

        if (!message || message.trim().length === 0) {
            notify('لطفا پیام خود را وارد کنید.');
            return;
        }

        if (!title || title.trim().length === 0) {
            notify('لطفا عنواتیکت را وارد کنید.');
            return;
        }

        if (users.length === 0) {
            notify('حداقل یک کاربر را انتخاب کنید.');
            return;
        }

        toggleMainLoader(true);

        const formData = new FormData();
        formData.set('message', message);
        formData.set('title', title);

        files.forEach((file) => {
            formData.append('files', file);
        });

        users.forEach((userId) => {
           formData.append('userIds', userId.value);
        });

        CreateNewTicket(formData).then(res => {
            toggleMainLoader(false);

            notify(constants.ADD_SUCCESS_TEXT, 'success')

            navigate(`/admin/ticketing/${res}`);
        })
            .catch(e => {
                toggleMainLoader(false);
                handleError(e);
            });
    }

    const attachFile = () => {
        fileRef.click();
    }

    const fileSelectChange = (e) => {
        const newFiles = [...files, ...e.target.files]
        setFiles(newFiles);

        // clear input
        e.target.value = null;
    }

    const formatUserSelect = (data) => {
        return data.items?.map((x) => {
            return {
                label: x.fullName,
                value: x.id,
            };
        }) ?? [];
    }

    const removeFile = (index) => {
        let newFiles = [...files];
        newFiles.splice(index, 1);

        setFiles(newFiles);
    }

    return (
        <>
            <Breadcrumb items={[{to: '/admin/ticketing', title: 'فهرست تیکت ها'}, {title: 'ایجاد تیکت', to: '#'}]}/>
            <Card>
                <div className="card-body p-3">
                    <form onSubmit={handleSubmit(createTicket)}>
                        <div className="mb-4 grid grid-cols-1 gap-1 md:gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
                            {/*<div className="form-control">*/}
                            {/*    <label className="label">*/}
                            {/*        <span className="label-text">عنوان تیکت</span>*/}
                            {/*    </label>*/}
                            {/*    <input*/}
                            {/*        placeholder="عنوان تیکت..."*/}
                            {/*        {...register('title', {required: true, min: 3})}*/}
                            {/*        value={title}*/}
                            {/*        onInput={(e) => setTitle(e.target.value)}*/}
                            {/*        style={{height: '38px'}}*/}
                            {/*        className={`input input-bordered rounded ${errors.title && 'input-error'} focus:outline-none text-sm w-full placeholder-gray-600`}*/}
                            {/*    />*/}
                            {/*</div>*/}

                            <Input
                                label="عنوان تیکت"
                                placeholder="عنوان تیکت..."
                                {...register('title', {required: true, min: 3})}
                                register={register}
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={errors.title && 'input-error'}
                            />

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">کاربران</span>
                                </label>
                                <ServerSideSelect
                                    required={true}
                                    placeholder='کاربران تیکت...'
                                    url={ApiConstants.Users.List}
                                    value={users}
                                    method={'POST'}
                                    onSelect={setUsers}
                                    multiple={true}
                                    formatData={formatUserSelect}
                                    className={`required ${errors.users ? 'input-error' : ''}`}
                                />
                            </div>
                        </div>

                        <QuillEditor
                            required={true}
                            ref={quillRef}
                            className="ql-height-300"
                            setContent={setMessage}
                            defaultValue={message}
                            placeholder="پیام خود را اینجا بنویسید..."
                        />

                        <div className="mt-2 flex justify-between items-center">
                            <div className="w-1/2">
                                <button type="submit"
                                        disabled={(quillRef?.current?.getEditor()?.getText()?.trim().length === 0) || message.trim().length === 0 || title.trim().length === 0 || (users ?? []).length === 0}
                                        className="btn rounded btn-svg btn-sm btn-success text-white">
                                    <ReactSVG src='/src/assets/svgs/send.svg'/>
                                    <span className="pr-2">ایجاد تیکت</span>
                                </button>

                                <button type="button"
                                        onClick={attachFile}
                                        className="btn rounded btn-svg btn-sm text-white mr-2"
                                >
                                    <ReactSVG src='/src/assets/svgs/paperclip.svg'/>
                                    <span className="pr-2 text-sm">فایل ضمیمه</span>
                                </button>
                                <input onChange={fileSelectChange} ref={(inputRef) => fileRef = inputRef} hidden={true}
                                       type="file" name="files"/>
                            </div>
                            <div dir="ltr" className="mb-4 grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-2">
                                {
                                    files.map((file, index) => {
                                        return (
                                            <div key={index} className="text-sm flex justify-between items-center mr-1 px-2 py-1 border rounded bg-slate-200">
                                                <span className="tooltip" data-tip={file.name}>{ strLimit(file.name) }</span>
                                                <button onClick={() => removeFile(index)}
                                                        className="ml-1 btn-outline btn btn-sm btn-square">x
                                                </button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </Card>
        </>
    );
}

export default CreateTicket;