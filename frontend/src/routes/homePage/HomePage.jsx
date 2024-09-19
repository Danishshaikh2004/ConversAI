import './homePage.css'
import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';

const HomePage = () => {
  const [typingStatus, setTypingStatus] = useState()

  return (
    <div className='homePage'>
      <div className="left">
        <h1>ConversAI</h1>
        <h2>Smart Conversations, Smarter Outcomes</h2>
        <h3>Unlock the power of AI to streamline your communications and achieve better results with ConversAI.</h3>
        <Link to="/sign-in">Take the first Step</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot-main.png" alt="" className='bot' />
          <div className="chat">
            <img src={typingStatus === "human1" ? "/human1.jpeg" : typingStatus === "human2" ? "/human2.jpeg" : "/bot-main.png"} alt="bot" />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Human : We produce food for Mice',
                2000, ()=>{
                  setTypingStatus("bot")
                },
                'Bot : We produce food for Hamsters',
                2000, ()=>{
                  setTypingStatus("human2")
                },
                'Human2 : We produce food for Guinea Pigs',
                2000, ()=>{
                  setTypingStatus("bot")
                },
                'Bot : We produce food for Chinchillas',
                2000, ()=>{
                  setTypingStatus("human1")
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
