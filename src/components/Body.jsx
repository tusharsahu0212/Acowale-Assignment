import React, { useState } from 'react'

function ImageWithPlaceholder({ src, alt, placeholder }) {
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleError = (event) => {
    // Check if the error is due to access denial
    if (event.target.src === src) {
      setImageLoaded(false);
    }
  };

  return (
    <img
      className="w-[100%] h-56 rounded"
      src={imageLoaded ? src : placeholder}
      alt={alt}
      onError={handleError}
    />
  );
}

function Body(props) {


  function getDiff(time) {

    // Get the current time in UTC
    const now = new Date();

    // Convert the given ISO 8601 string to a Date object
    const past = new Date(time);

    // Calculate the difference in milliseconds
    const diffMs = now - past;

    // Convert milliseconds to years, months, days, hours, minutes, and seconds
    const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diffMs - years * 1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24 * 30)) % 12;
    const days = Math.floor((diffMs - years * 1000 * 60 * 60 * 24 * 365 - months * 1000 * 60 * 60 * 24 * 30) / (1000 * 60 * 60 * 24)) % 30;
    const hours = Math.floor((diffMs - years * 1000 * 60 * 60 * 24 * 365 - months * 1000 * 60 * 60 * 24 * 30 - days * 1000 * 60 * 60 * 24) / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor((diffMs - years * 1000 * 60 * 60 * 24 * 365 - months * 1000 * 60 * 60 * 24 * 30 - days * 1000 * 60 * 60 * 24 - hours * 1000 * 60 * 60) / (1000 * 60)) % 60;
    const seconds = Math.floor((diffMs - years * 1000 * 60 * 60 * 24 * 365 - months * 1000 * 60 * 60 * 24 * 30 - days * 1000 * 60 * 60 * 24 - hours * 1000 * 60 * 60 - minutes * 1000 * 60) / 1000) % 60;

    if (years) return `${years} years ago`;
    if (months) return `${months} months ago`;
    if (days) return `${days} days ago`;
    if (hours) return `${hours} hours ago`;
    if (minutes) return `${minutes} minutes ago`;
    if (seconds) return `${seconds} seconds ago`;
  }

  return (

    <div className="flex flex-wrap justify-center mt-5 gap-10 p-5">
      {props.articles && props.articles.length !== 0 &&
        props.articles.map((article, index) => (
          <div key={index} className="flex flex-col border w-96 shadow-md rounded p-4 md:w-[40vw]">

            <ImageWithPlaceholder
              src={article["image"]}
              alt={article["title"]}
              placeholder="https://www.drsubhashr.com/wp-content/uploads/2018/12/news-placeholder.png" 
            />

            <div className='flex justify-between'>
              <a className='text-cyan-900' href={article["source"]["url"]}>{article["source"]["name"]}</a>
              <div className='text-cyan-900'>{getDiff(article["publishedAt"])}</div>
            </div>

            {(article["title"].length >= 1000 ? <div className="font-bold">{article["title"].slice(0, 100) + "..."}</div> : <div className="font-bold">{article["title"]}</div>)}

            {(article["description"].length >= 2500 ? <div>{article["description"].slice(0, 250) + "..."}</div> : <div>{article["description"]}</div>)}


            <a className='mx-auto mt-2' href={article["url"]} target='_blank' rel="noreferrer">
              <button className="border border-green-700 text-green-700 rounded w-24 h-10 hover:bg-green-700 hover:text-white active:shadow-md active:bg-green-800 px-2">Read More</button>
            </a>


          </div>
        ))

      }
    </div>
  )
}

export default Body