import { useState, useRef } from "react";
import {AiFillDislike, AiFillLike, AiOutlineHeart} from "react-icons/ai"
import {FcLike, FcDislike} from "react-icons/fc"
import "../css/joke.css";

async function getData(url)
{
    let jsonData = await fetch(url);
    let rawData = await jsonData.json();
    return rawData;
}



export default function Joke()
{
    const ref = useRef();

const [joke, setJoke] = useState(null);


function buttonClicked()
{
    document.getElementById("like").removeAttribute("class");
    document.getElementById("like").classList.add("heartHidden");
    document.getElementById("dislike").removeAttribute("class");
    document.getElementById("dislike").classList.add("heartHidden");
    document.getElementById("heart").removeAttribute("class");
    document.getElementById("heart").classList.add("heartVisible");

    joke ? document.getElementById("button").innerText = "SHOW JOKE" : document.getElementById("button").innerText = "HIDE JOKE";
    joke ? ref.current.classList.remove("on") : ref.current.classList.add("on");
    joke ? setJoke(null) :  getData("https://icanhazdadjoke.com/slack")
    .then((APIdata)=>{setJoke(APIdata.attachments[0].text)});   
            
}
   
  function likeCliked()
  {
      let heart = document.getElementById("heart");
      let like = document.getElementById("like");
      let dislike  = document.getElementById("dislike");        
      heart.classList.contains("heartVisible") ?  heart.classList.remove("heartVisible") :  dislike.classList.remove("heartVisible");
      heart.classList.contains("heartHidden") ? dislike.classList.add("heartHidden") : heart.classList.add("heartHidden");
      like.classList.remove("heartHidden");
     like.classList.add("heartVisible");
     
  }

  function dislikeClicked()
  {
    let heart = document.getElementById("heart");
      let like = document.getElementById("like");
      let dislike  = document.getElementById("dislike");
      heart.classList.contains("heartVisible") ?  heart.classList.remove("heartVisible") :  like.classList.remove("heartVisible");
      heart.classList.contains("heartHidden") ? like.classList.add("heartHidden") : heart.classList.add("heartHidden");
      dislike.classList.remove("heartHidden");
     dislike.classList.add("heartVisible");
  }

    return(
    <div className="container">
    <button id="button" onClick={buttonClicked}>SHOW JOKE</button>
    <div  className={`card ${joke ? "visile" : "hidden"}`}>
        <div className="heartDiv">
        <AiOutlineHeart id="heart" className="heartVisible"/>
        <FcDislike id="dislike" className="heartHidden"/>
        <FcLike id="like" className="heartHidden"/>
        </div>
        <p ref={ref}>{joke}</p>
        <div className="divIcon">
         <div><AiFillDislike onClick={dislikeClicked}/></div>
         <div> <AiFillLike onClick={likeCliked}/></div>   
        </div>
        </div>
    </div>
    )
}