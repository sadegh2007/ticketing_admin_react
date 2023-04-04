import Card from "../../components/global/Card.jsx";
import Breadcrumb from "../../components/global/Breadcrumb.jsx";
import {useForm} from "react-hook-form";
import {appContext} from "../../context/AppContext.js";
import React, {useContext, useRef, useState} from "react";
import {CreateNewTicket} from "../../services/TicketingApiService.js";
import {notify} from "../../utilities/index.js";
import {constants} from "../../general/constants.js";
import {handleError} from "../../services/GlobalService.js";
import ServerSideSelect from "../../components/SelectBox/ServerSideSelect.jsx";
import ApiConstants from "../../general/ApiConstants.js";
import {useNavigate} from "react-router-dom";
import Input from "../../components/global/Form/Input.jsx";
import MessageBox from "../../components/ticketing/MessageBox.jsx";
import CustomSelect from "../../components/SelectBox/CustomSelect.jsx";
import {GetTenant} from "../../services/AuthService.js";

const CreateTicket = ({}) => {
    const {register, formState: {errors}} = useForm();
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [files, setFiles] = useState([]);
    const {showMainLoader, toggleMainLoader} = useContext(appContext);
    const [users, setUsers] = useState(null);
    const [department, setDepartment] = useState(null);
    const [priority, setPriority] = useState({value: 0, label: 'کم'});
    const [type, setType] = useState('department');
    const [categories, setCategories] = useState();

    const navigate = useNavigate();

    const currentTenant = GetTenant();

    let fileRef = useRef(null);
    const quillRef = useRef(null);

    const createTicket = () => {
        if (!message || message.trim().length === 0) {
            notify('لطفا پیام خود را وارد کنید.');
            return;
        }

        if (!title || title.trim().length === 0) {
            notify('لطفا عنوان تیکت را وارد کنید.');
            return;
        }

        if (type === 'users' && users.length === 0) {
            notify('حداقل یک کاربر را انتخاب کنید.');
            return;
        }

        if (type === 'department' && !department) {
            notify('لطفا دپارتمان مورد نظر انتخاب کنید.');
            return;
        }

        toggleMainLoader(true);

        const formData = new FormData();
        formData.set('message', message);
        formData.set('title', title);

        if (categories && categories.length > 0) {
            categories.forEach((category) => {
                formData.append('categories', category.value);
            });
        }

        if (department) {
            formData.set('departmentId', department.value);
        }

        if (priority) {
            formData.set('priority', priority.value);
        }

        files.forEach((file) => {
            formData.append('files', file);
        });

        if (type === 'users') {
            users.forEach((userId) => {
                formData.append('userIds', userId.value);
            });
        }

        CreateNewTicket(formData).then(res => {
            toggleMainLoader(false);

            notify(constants.ADD_SUCCESS_TEXT, 'success')

            navigate(`/${currentTenant}/admin/ticketing/${res}`);
        })
            .catch(e => {
                toggleMainLoader(false);
                handleError(e.response);
            });
    }

    const formatUserSelect = (data) => {
        return data.items?.map((x) => {
            return {
                label: x.fullName,
                value: x.id,
            };
        }) ?? [];
    }

    const formatDepartmentSelect = (data) => {
        return data.items?.map((x) => {
            return {
                label: x.title,
                value: x.id,
            };
        }) ?? [];
    }

    return (
        <>
            <Breadcrumb items={[{to: `/${currentTenant}/admin/ticketing`, title: 'فهرست تیکت ها'}, {
                title: 'ایجاد تیکت',
                to: '#'
            }]}/>
            <Card title="ایجاد تیکت" icon="/src/assets/svgs/plus.svg">
                <div className="flex items-center mb-4">
                    <div className="form-control flex justify-center">
                        <label className="label cursor-pointer">
                            <input onChange={(e) => setType(e.target.value)} value="department" type="radio" name="radio-10" className="radio"
                                   checked={type === 'department'}
                            />
                            <span className="mr-2 label-text">دپارتمان</span>
                        </label>
                    </div>
                    <div className="form-control mr-4">
                        <label className="label cursor-pointer">
                            <input onChange={(e) => setType(e.target.value)} value="users" type="radio" name="radio-10"
                                   className="radio"
                                   checked={type === 'users'}/>
                            <span className="mr-2 label-text">کاربری</span>
                        </label>
                    </div>
                </div>

                <div className="mb-4 grid grid-cols-1 gap-1 md:gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
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

                    {
                        type === 'department' ? <div className="form-control">
                            <label className="label">
                                <span className="label-text">دپارتمان</span>
                            </label>
                            <ServerSideSelect
                                placeholder='دپارتمان...'
                                url={ApiConstants.Departments.List}
                                value={department}
                                method={'POST'}
                                onSelect={setDepartment}
                                formatData={formatDepartmentSelect}
                                className={`required ${errors.users ? 'input-error' : ''}`}
                            />
                        </div> : undefined
                    }
                    {
                        type === 'users'
                            ? <div className="form-control">
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
                            : undefined
                    }

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">دسته بندی ها</span>
                        </label>
                        <ServerSideSelect
                            placeholder="انتخاب دسته بندی ها..."
                            url={ApiConstants.Categories.List}
                            method={'POST'}
                            multiple={true}
                            onSelect={setCategories}
                            value={categories}
                            formatData={formatDepartmentSelect}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">اولویت</span>
                        </label>
                        <CustomSelect
                            placeholder="انتخاب اولویت..."
                            onSelect={setPriority}
                            value={priority}
                            options={[{value: 0, label: 'کم'}, {value: 1, label: 'متوسط'}, {value: 2, label: 'زیاد'}]}
                        />
                    </div>
                </div>

                <MessageBox
                    height={300}
                    message={message}
                    setMessage={setMessage}
                    files={files}
                    setFiles={setFiles}
                    onSend={createTicket}
                />
            </Card>
        </>
    );
}

export default CreateTicket;