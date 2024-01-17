import React, { useState, useEffect } from 'react';
import { Gallery } from "react-grid-gallery";

function ImageUpload() {

  const [file, setFile] = useState();
  const [caption, setCaption] = useState('');
  const [photos, setPhotos] = useState([]);
  const [imageReady, setImageReady] = useState(false);

  

  const fetchImages = async () => {
    try{
      const response = await fetch('/api/getImages')
      const data = await response.json();
      console.log('from data: ',data)
   
      const formatPhotoData = [];
      data.forEach(el => {
        const elkey = el.imageid;
        const elurl = el.imageurl;
        formatPhotoData.push({src: elurl})
      })

      await setPhotos(formatPhotoData)
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



  // setTimeout(() => {
  //   window.location.reload();
  // }, 2000);


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
      window.location.reload();
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
        {/* <div id='moodboard-container' style={{width: '500px', height: '200px'}}>
          <PhotoAlbum layout="masonry" photos={photos} />
        </div> */}
        <div id='moodboard-container' style={{width: '900px', height: '200px'}}>
          <Gallery images={photos} />
        </div>
      </div>
    </>
  )
}

export default ImageUpload;