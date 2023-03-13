import Card from "../../components/global/Card.jsx";
import Breadcrumb from "../../components/global/Breadcrumb.jsx";
import {useForm} from "react-hook-form";
import {ReactSVG} from "react-svg";
import {appContext} from "../../context/AppContext.js";
import {useContext, useRef, useState} from "react";
import {SendNewComment} from "../../services/TicketingApiService.js";
import {notify} from "../../utilities/index.js";
import {constants} from "../../general/constants.js";
import {handleError} from "../../services/GlobalService.js";
import ServerSideSelect from "../../components/SelectBox/ServerSideSelect.jsx";
import ApiConstants from "../../general/ApiConstants.js";

const CreateTicket = ({}) => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);
    const {showMainLoader, toggleMainLoader} = useContext(appContext);
    const [users, setUsers] = useState([]);

    let fileRef = useRef();

    const createTicket = () => {
        // if (!message || message.trim().length === 0) {
        //     notify('لطفا پیام خود را وارد کنید.');
        //     return;
        // }

        console.log('send ticket')
        return;

        toggleMainLoader(true);

        const formData = new FormData();
        formData.set('message', message);

        files.forEach((file) => {
            formData.append('files', file);
        })

        // SendNewComment(ticketId, formData).then(res => {
        //     const newTicket = ticket;
        //     newTicket.comments.push(res);
        //
        //     setTicket(newTicket);
        //     setMessage('');
        //     setFiles([]);
        //
        //     toggleMainLoader(false);
        //
        //     notify(constants.ADD_SUCCESS_TEXT, 'success')
        // })
        //     .catch(e => {
        //         toggleMainLoader(false);
        //         handleError(e);
        //     });
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
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">کاربران</span>
                                </label>
                                <ServerSideSelect
                                    url={ApiConstants.Users.List}
                                    method={'POST'}
                                    onSelect={setUsers}
                                    multiple={true}
                                    formatData={formatUserSelect}
                                />
                            </div>
                        </div>

                        <textarea
                            rows={8}
                            placeholder="پیام خود را اینجا بنویسید..."
                            {...register('message', {required: true, min: 3})}
                            value={message}
                            onInput={(e) => setMessage(e.target.value)}
                            className={`textarea rounded ${errors.message && 'textarea-error'} w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pr-4 pl-12 bg-gray-200 py-3`}>
                                </textarea>
                        <div className="mt-4 flex justify-between items-center">
                            <div className="">
                                <button type="submit"
                                    // onClick={sendMessage}
                                        className="btn btn-success text-white">
                                    <ReactSVG src='/src/assets/svgs/send.svg'/>
                                    <span className="pr-2">ایجاد تیکت</span>
                                </button>

                                <button type="button"
                                        onClick={attachFile}
                                        className="btn text-white mr-2"
                                >
                                    <ReactSVG src='/src/assets/svgs/paperclip.svg'/>
                                    <span className="pr-2 text-sm">فایل ضمیمه</span>
                                </button>
                                <input onChange={fileSelectChange} ref={(inputRef) => fileRef = inputRef} hidden={true}
                                       type="file" name="files"/>
                            </div>
                            <div dir="ltr" className="flex text-sm text-gray-600">
                                {
                                    files.map((file, index) => {
                                        return (
                                            <div key={index} className="mr-1 px-2 py-1 border rounded bg-slate-200">
                                                {file.name}
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