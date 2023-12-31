import React, { useState, useEffect } from 'react';
import './styles.css';

const Grid = () => {
  const [cellBackgrounds, setCellBackgrounds] = useState(
    Array.from({ length: 10000 }, () => 'white')
  );

  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isMouseOverPopup, setMouseOverPopup] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
const [selectedColor, setSelectedColor] = useState('red');

  const toggleCellColor = (index) => {
    setCellBackgrounds((prevBackgrounds) => {
      const newBackgrounds = [...prevBackgrounds];
      newBackgrounds[index] = selectedColor;
      return newBackgrounds;
    });
  };

  const handleContextMenu = (event, index) => {
    event.preventDefault();
    setPopupVisible(true);
    setPopupPosition({ x: event.clientX, y: event.clientY });
  };

  const handleSquareClick = (color) => {
    setSelectedColor(color);
    setPopupVisible(false);
  };

  const handleMouseMove = (event) => {
    const popupElement = document.querySelector('.popup');
    if (popupElement && popupElement.contains(event.target)) {
      setMouseOverPopup(true);
    } else {
      setMouseOverPopup(false);
      setPopupVisible(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (!isMouseOverPopup) {
        setPopupVisible(false);
      }
    };
  
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('mousemove', handleMouseMove);
  
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMouseOverPopup]);

  const cells = Array.from({ length: 10000 }, (_, index) => index + 1);

  return (
    <div className="grid">
      {cells.map((cell, index) => (
        <div
          key={cell}
          className="cell"
          style={{ backgroundColor: cellBackgrounds[index] }}
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
          <button className='Square' style={{backgroundColor:'#FF00FF'}} onClick={() => handleSquareClick('#FF00FF')}/>
          <button className='Square' style={{backgroundColor:'#FF7F7E'}} onClick={() => handleSquareClick('#FF7F7E')}/>
          <button className='Square' style={{backgroundColor:'#0600FF'}} onClick={() => handleSquareClick('#0600FF')}/>
          <button className='Square' style={{backgroundColor:'#FFFF00'}} onClick={() => handleSquareClick('#FFFF00')}/>
          <button className='Square' style={{backgroundColor:'#7EFFFF'}} onClick={() => handleSquareClick('#7EFFFF')}/>
        </div>
      )}
    </div>
  );
};

export default Grid;
