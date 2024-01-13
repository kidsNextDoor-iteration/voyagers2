import React, { useState } from 'react'

function ImageUpload() {

  const [file, setFile] = useState();
  const [caption, setCaption] = useState('');


  const submit = async event => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
  
    try {
      const response = await fetch("/api/uploadimage", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log("Upload successful:", responseData);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  


  return (
    <>
      <h1>image upload</h1>
        {/* <form action="/api/uploadimage" method='post' enctype="multipart/form-data">
        <input type="file" name='image' accept='image/*' />
        <input type="text" name='caption' placeholder='caption' />
        <input type="submit" value="Submit"></input>
      </form> */}

      <form onSubmit={submit}>
        <input onChange={e => setFile(e.target.files[0])} type="file" accept='image/*'></input>
        <input value={caption} onChange={e => setCaption(e.target.value)} type='text' placeholder='caption' />
        <button type='submit'>Submit</button>
      </form>

    </>
  )
}

export default ImageUpload;