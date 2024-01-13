import React, { useState, useEffect } from 'react';
import PhotoAlbum from "react-photo-album";

function ImageUpload() {

  const [file, setFile] = useState();
  const [caption, setCaption] = useState('');
  const [photos, setPhotos] = useState([]);
  const [imageReady, setImageReady] = useState(false);



  const fetchImages = async () => {
    try{
      const response = await fetch('/api/getImages')
      const data = await response.json();
   
      setPhotos(data)
      setImageReady(true);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(!imageReady){
      fetchImages();
    }
  },[]);

  console.log('photos: ', photos)




  const submit = async event => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    setCaption('')
  
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

      <form onSubmit={submit}>
        <input onChange={e => setFile(e.target.files[0])} type="file" accept='image/*'></input>
        <input value={caption} onChange={e => setCaption(e.target.value)} type='text' placeholder='caption' />
        <button type='submit'>Submit</button>
      </form>

      <div>
        <h1>moodboard</h1>
        <PhotoAlbum layout="masonry" photos={photos} />
      </div>
    </>
  )
}

export default ImageUpload;