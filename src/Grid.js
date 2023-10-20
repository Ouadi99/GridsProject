import React, { useState, useEffect } from 'react';
import './styles.css';

const Grid = () => {
  const [cellBackgrounds, setCellBackgrounds] = useState(
    Array.from({ length: 10000 }, () => 'white')
  );

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const toggleCellColor = (index) => {
    setCellBackgrounds((prevBackgrounds) => {
      const newBackgrounds = [...prevBackgrounds];
      newBackgrounds[index] = prevBackgrounds[index] === 'white' ? 'red' : 'white';
      return newBackgrounds;
    });
  };

  const handleContextMenu = (event, index) => {
    event.preventDefault();
    setPopupVisible(true);
    setPopupPosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setPopupVisible(false);
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const cells = Array.from({ length: 10000 }, (_, index) => index + 1);

  return (
    <div className="grid">
      {cells.map((cell, index) => (
        <div
          key={cell}
          className={`cell ${cellBackgrounds[index] === 'red' ? 'red' : ''}`}
          onClick={() => toggleCellColor(index)}
          onContextMenu={(event) => handleContextMenu(event, index)}
        ></div>
      ))}

      {isPopupVisible && (
        <div
          className="popup"
          style={{
            top: `${popupPosition.y}px`,
            left: `${popupPosition.x}px`,
          }}
        >
          
        </div>
      )}
    </div>
  );
};

export default Grid;
