import React, {useEffect, useState} from "react";
import ReactQuill from "react-quill";

const QuillEditor = React.forwardRef(({className, defaultValue, placeholder, setContent}, ref) => {
    const quillModules = {
        modules: {
            toolbar: {
                container: [

                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                    [{ 'direction': 'rtl' }],                         // text direction
                    [{ 'align': [] }],

                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    // ['blockquote'/* , 'code-block' */],

                    // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                    // [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent

                    [/* 'image', */ /* 'video' */],
                    // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    // [{ 'font': [] }],

                    ['link'],

                    ['clean']

                ], // container

                handlers: {
                    customImage: () => {
                        // toggleFileManagerModal(true);
                    }
                }

            } // toolbar

        } // modules

    } // quillModules

    // useEffect(() => {
    //     setQuillOptions(quillModules);
    // }, [])

    const [quillOptions, setQuillOptions] = useState(quillModules);

    return <ReactQuill
        ref={ref}
        className={`${className ?? 'ql-height-300'}`}
        theme="snow"
        modules={quillOptions.modules}
        value={defaultValue}
        onChange={setContent}
        name={name}
        placeholder={placeholder}
    />;
});

export default QuillEditor;