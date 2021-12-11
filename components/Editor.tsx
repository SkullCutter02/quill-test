import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";

import useImageUpload from "../hooks/useImageUpload";

const ForwardedRefReactQuill = dynamic(() => import("./WrappedEditor"), {
  ssr: false,
});

const Editor: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const editorRef = useRef<ReactQuill>(null);

  const { imageHandler } = useImageUpload(editorRef);

  /* Memoised so modules doesn't rerender every time and cause the editor to unfocus and flicker */
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "code", "link"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          ["image", "video"],
          ["formula"],
          ["clean"],
        ],
        handlers: {
          // image: imageHandler, // enable to upload to server
        },
      },
      syntax: true,
      // imageCompress: {
      //   quality: 0.7, // default
      //   maxWidth: 1000, // default
      //   maxHeight: 1000, // default
      //   imageType: "image/jpeg", // default
      //   debug: true, // default
      // },
    }),
    []
  );

  const saveEditor = () => {
    localStorage.setItem(
      "data",
      JSON.stringify(editorRef.current.getEditor().getContents())
    );
  };

  return (
    <>
      <main>
        <ForwardedRefReactQuill
          editorRef={editorRef}
          theme={"snow"}
          value={value}
          onChange={setValue}
          modules={modules}
          style={{ width: "50%", height: "400px" }}
          placeholder={"Type here..."}
        />
        <ForwardedRefReactQuill
          theme={"snow"}
          // value={
          //   editorRef.current && editorRef.current.getEditor().getContents()
          // }
          value={process.browser && JSON.parse(localStorage.getItem("data"))}
          modules={{ toolbar: null, syntax: true }}
          style={{ width: "50%", height: "500px" }}
          readOnly
        />
      </main>
      <button onClick={saveEditor}>Save</button>

      <style jsx>{`
        main {
          display: flex;
        }
      `}</style>
    </>
  );
};

export default Editor;
