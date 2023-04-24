import React from "react";
import { useRef } from "react";
import axios from "axios";
const Upload = () => {
  const img1 = useRef();

  function handleSubmit() {
    console.log("in sub");
    console.log(img1.current.files[0]);
    let data = new FormData();

    data.append("image", img1.current.files[0]);
    axios
      .post("http://localhost:5001/upload", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  }

  return (
    <div>
      <label htmlFor="">upload image</label>
      <input type="file" name="image" id="" ref={img1} />
      <button onClick={handleSubmit}>upload</button>
    </div>
  );
};

export default Upload;
