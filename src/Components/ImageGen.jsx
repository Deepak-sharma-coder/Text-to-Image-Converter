import './ImageGen.css';
// import React from 'react'
import default_image from '../assets/default_image.svg'
import { useRef, useState } from 'react';

const ImageGen = () => {
  const [image_url, setImage_url] = useState('/');
  let inputRef = useRef(null);
  //create another useState for load
  const [loading, setLoading] = useState(false);

  const imageGenrate = async() => {
    if(inputRef.current.value === ""){1
      return 0;
    }
    setLoading(true)
    
    const response = await fetch(
    //and here we used the open ai api 
    "https://api.openai.com/v1/images/generations",
    {
      method: "POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:
        "Bearer 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",
        // "User-Agent":"Chrome",
      },
      body:JSON.stringify({
        model: "gpt-image-1", // ✅ REQUIRED
        prompt:`${inputRef.current.value}`, // The text prompt for the image
        n:1,//for one image
        size:"512x512" // The size of the generated images
      }),
    }
  );

const data = await response.json();

if (!response.ok) {
  console.error("OpenAI API error:", response.status, data);
  return;
}

if (data.data[0].url) {
  setImage_url(data.data[0].url);
} else {
  console.error("No image URL returned:", data);
}
setLoading(false)
}

  return (
    <div className='Ai-Image_Gen'>
      <h1 className='Header'>AI IMAGE <span>GENERATOR</span></h1>
      <div className='Img-load'>
        {/* here we used the ternary operator */}
        <div className='image'><img src={image_url === "/"?default_image :image_url} alt='err'/></div>
        <div className='loading'>
          <div className={loading?"loading-bar-full": "loading-bar"}></div>
          <div className={loading?"loading-text": "display-none"}>Loading...</div>
        </div>
      </div>

      <div className='Search-box'>
        <input type='text' ref={inputRef} placeholder='Describe What You Want To See!' className='search-input'/>
        <div className='generate-btn' onClick={() =>{imageGenrate()}}>Generate</div>
      </div>
    </div>
  )
}

export default ImageGen