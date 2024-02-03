import React, { useState, useEffect } from 'react';
import { Gallery } from "react-grid-gallery";
import deleteIcon from '../Images/deleteIcon.png';


function Moodboard({ fetchedTripId }) {

  const [file, setFile] = useState();
  const [caption, setCaption] = useState('');
  const [photos, setPhotos] = useState([]);
  const [imageReady, setImageReady] = useState(false);

  // for moodboard 
  const [popUp, setPopUp] = useState(false)
  const [poppedImage, setPoppedImage] = useState()

  const fetchImages = async () => {
    try {
      // need to send fetchedTripId in body,
      console.log('fetching tripid in fetch images: ', fetchedTripId)
      const response = await fetch('/api/getImages')
      const data = await response.json();
      console.log('from data: ', data)

      const formatPhotoData = [];
      data.forEach(el => {
        const elkey = el.imageid;
        const elurl = el.imageurl;
        formatPhotoData.push({ src: elurl })
      })

      await setPhotos(formatPhotoData)
      setImageReady(true);
    } catch (err) {
      console.log('i didnt even work')
      console.log(err);
    }
  }


  useEffect(() => {
    if (!imageReady) {
      fetchImages();
    }
  }, []);


  console.log('photos: ', photos)




  const submit = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    formData.append("tripID", fetchedTripId)
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

  const handleClick = (e, { src }) => {
    setPoppedImage(src)
    setPopUp(true)
  };

  const closeModal = () => {
    setPopUp(false)
  };

  const deleteImgFunc = async () => {
    try {
      const imgSrc = poppedImage;
      await fetch('/api/deleteImage', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imgSrc }),
      })
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const photoArr = photos.map(photo => {
    return (
      <div>
        <img src={photo.url}></img>
      </div>
    )

  })

  return (
    <>

      {/* <img src='https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_lg_2x/f_auto/primary/b2unl1gppjiic0fld0em'></img> */}
      <Gallery images={photos} rowHeight={228} margin={9} onClick={handleClick} />
      {/* <div id='moodboard-container' style={{ height: '90%' }}> */}
      {/* <Gallery images={photos} rowHeight={228} margin={9} onClick={handleClick}/> */}
      {console.log('photos: ', photos)}

      {photoArr}
      {/* {photos.map(photo => { <img src={photo.src}></img> })} */}
      {/* </div> */}

      {popUp && (
        <div className='pop-up'>
          <div className='pop-up-overlay' onClick={closeModal}></div>
          <div className='pop-up-content'>
            <div className='pic-btn-container'>
              <button className='close-btn' onClick={closeModal}>X</button>
              <button className='delete-btn' onClick={deleteImgFunc}><img className='trash-icon' src={deleteIcon} alt="" /></button>
            </div>
            <div className='selected-img-container'>
              <img className='selected-img' src={poppedImage} alt="" />
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default Moodboard;