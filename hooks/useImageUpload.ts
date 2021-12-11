import { MutableRefObject } from "react";
import ReactQuill from "react-quill";

export default function useImageUpload(
  editorRef: MutableRefObject<ReactQuill>
) {
  const insertToEditor = (url: string) => {
    const range = editorRef.current.getEditor().getSelection();
    editorRef.current.getEditor().insertEmbed(range.index, "image", url);
  };

  const saveImageToServer = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "school-website-images");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_USER_ID}/image/upload`,
      {
        method: "POST",
        body: fd,
      }
    );
    const data = await res.json();

    if (res.ok) {
      insertToEditor(data.secure_url);
    } else {
      console.error("Upload image failed");
    }
  };

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];

      // file type is only image.
      if (/^image\//.test(file.type)) {
        await saveImageToServer(file);
      } else {
        console.warn("You could only upload images.");
      }
    };
  };

  return { imageHandler };
}
