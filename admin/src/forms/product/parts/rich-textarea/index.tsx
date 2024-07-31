import DisabledContext from 'antd/es/config-provider/DisabledContext';
import React from 'react';

import ReactQuill, { type ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'code'],
    ['clean'],
  ],
};

const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'code'];

interface IRichTextarea extends ReactQuillProps {}

const RichTextarea: React.FC<IRichTextarea> = ({ value, onChange, placeholder }) => {
  const disabled = React.useContext(DisabledContext);
  return (
    <>
      <ReactQuill
        theme="snow"
        readOnly={disabled}
        style={{ opacity: disabled ? 0.5 : 1 }}
        value={value || ''}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default RichTextarea;
