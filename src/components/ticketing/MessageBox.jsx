import QuillEditor from "../global/QuillEditor.jsx";
import {ReactSVG} from "react-svg";
import {strLimit} from "../../utilities/index.js";
import React, {useRef} from "react";

const MessageBox = (
    {
        height = 100,
        onSend,
        message,
        setMessage,
        files,
        setFiles,
        replyTo = null,
        onCloseReply
    }) => {

    let fileRef = useRef();
    const quillRef = useRef(null);

    const attachFile = () => {
        fileRef.click();
    }

    const fileSelectChange = (e) => {
        const newFiles = [...files, ...e.target.files]
        setFiles(newFiles);

        // clear input
        e.target.value = null;
    }

    const removeFile = (index) => {
        let newFiles = [...files];
        newFiles.splice(index, 1);

        setFiles(newFiles);
    }

    return (
        <>
            {
                replyTo ? <div className="bg-gray-300 p-3 text-xs rounded-t">
                    <button className="btn btn-xs btn-outline border-none mb-2" onClick={onCloseReply}>x</button>
                    <div className="" dangerouslySetInnerHTML={{__html: replyTo.message}}></div>
                </div> : undefined
            }

            <QuillEditor
                ref={quillRef}
                className={`ql-height-${height}`}
                setContent={setMessage}
                defaultValue={message}
                placeholder="پیام خود را اینجا بنویسید..."
            />

            <div className="mt-2 flex justify-between items-center">
                <div className="">
                    <button type="submit"
                            onClick={() => onSend(replyTo?.id)}
                            className="rounded text-xs btn btn-svg btn-sm btn-success text-white">
                        <ReactSVG src='/src/assets/svgs/send.svg'/>
                        <span className="pr-2">ارسال</span>
                    </button>

                    <button type="button"
                            onClick={attachFile}
                            className="rounded text-xs btn btn-svg btn-sm text-white mr-2"
                    >
                        <ReactSVG src='/src/assets/svgs/paperclip.svg'/>
                        <span className="pr-2">فایل ضمیمه</span>
                    </button>
                    <input onChange={fileSelectChange} ref={(inputRef) => fileRef = inputRef} hidden={true} type="file"
                           name="files"/>
                </div>
                <div dir="ltr" className="text-sm mb-4 grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-2">
                    {
                        files.map((file, index) => {
                            return (
                                <div key={index}
                                     className="flex justify-between items-center mr-1 px-2 py-1 border rounded bg-slate-200">
                                    <span className="tooltip text-xs" data-tip={file.name}>{strLimit(file.name)}</span>
                                    <button onClick={() => removeFile(index)}
                                            className="ml-2 btn-outline btn btn-xs btn-square">x
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default MessageBox;