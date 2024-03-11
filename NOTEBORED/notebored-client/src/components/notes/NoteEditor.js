import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const NoteEditor = ({ initialContent, onContentChange }) => {
    const [content, setContent] = useState(initialContent)

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent])

    const handleChange = (content, delta, source, editor) => {
        setContent(editor.getContents())
        onContentChange(editor.getContents())
    };

    return (
        <ReactQuill
            value={content}
            onChange={handleChange}
            modules={{
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    ['image', 'code-block']
                ]
            }}
            theme="snow"
        />
    )
};

export default NoteEditor