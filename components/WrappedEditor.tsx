import React, { ComponentProps, LegacyRef } from "react";
import ReactQuill from "react-quill";

interface Props extends ComponentProps<typeof ReactQuill> {
  editorRef?: LegacyRef<ReactQuill>;
}

const WrappedEditor: React.FC<Props> = ({ editorRef, ...props }) => {
  return (
    <>
      <ReactQuill {...props} ref={editorRef} />
    </>
  );
};

export default WrappedEditor;
