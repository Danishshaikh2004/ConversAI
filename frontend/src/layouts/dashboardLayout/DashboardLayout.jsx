import { useState } from 'react';
import ChatList from '../../components/ChatList' 
import ChatPage from '../../routes/chatPage/ChatPage'; // Import your ChatPage component
import hamburgerImage from '/hamburger.png'; // Path to your hamburger image
import './dashboardLayout.css'

const DashboardLayout = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true); // Default to visible

  const handleToggleClick = () => {
    setIsMenuVisible((prevState) => !prevState); // Toggle visibility
  };

  return (
    <div className="dashboardLayout">
      {/* Hamburger Icon */}
      <button className="toggle-button" onClick={handleToggleClick}>
        <img
          src={hamburgerImage}
          alt={isMenuVisible ? 'Hide Menu' : 'Show Menu'}
          className="toggle-image"
        />
      </button>

      {/* Chat List */}
      {isMenuVisible && (
        <div className="menu">
          <ChatList />
        </div>
      )}

      {/* Chat Page */}
      <div className={`content ${isMenuVisible ? 'menu-open' : 'menu-closed'}`}>
        <ChatPage />
      </div>
    </div>
  );
};

export default DashboardLayout;
