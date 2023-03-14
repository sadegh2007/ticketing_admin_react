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

const CreateTicket = ({}) => {
    const {register, formState: {errors}} = useForm();
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [files, setFiles] = useState([]);
    const {showMainLoader, toggleMainLoader} = useContext(appContext);
    const [users, setUsers] = useState(null);
    const navigate = useNavigate();

    let fileRef = useRef(null);
    const quillRef = useRef(null);

    const createTicket = () => {
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

    const formatUserSelect = (data) => {
        return data.items?.map((x) => {
            return {
                label: x.fullName,
                value: x.id,
            };
        }) ?? [];
    }

    return (
        <>
            <Breadcrumb items={[{to: '/admin/ticketing', title: 'فهرست تیکت ها'}, {title: 'ایجاد تیکت', to: '#'}]}/>
            <Card>
                <div className="card-body p-3">
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

                    <MessageBox
                        height={300}
                        message={message}
                        setMessage={setMessage}
                        files={files}
                        setFiles={setFiles}
                        onSend={createTicket}
                    />
                </div>
            </Card>
        </>
    );
}

export default CreateTicket;