import React, { useState, useEffect, useRef } from "react";
import { createClockNumbers, timeToWords } from "../Jsfiles/function";
import "../css/clock.css";
import Content from "./Content";

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

const Clock: React.FC = () => {
  const [time, setTime] = useState<Time>({ hours: 5, minutes: 0, seconds: 0 });
  const [hourInput, setHourInput] = useState("05");
  const [minuteInput, setMinuteInput] = useState("00");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(true);
  const clockFaceRef = useRef<HTMLDivElement>(null);
  const hourHandRef = useRef<HTMLDivElement>(null);
  const minuteHandRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (clockFaceRef.current) {
      createClockNumbers(clockFaceRef.current);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  
  useEffect(() => {
    const hourDegrees = (time.hours % 12) * 30 + (time.minutes / 60) * 30;
    const minuteDegrees = time.minutes * 6;

    if (hourHandRef.current) {
      hourHandRef.current.style.transform = `rotate(${hourDegrees}deg)`;
    }
    if (minuteHandRef.current) {
      minuteHandRef.current.style.transform = `rotate(${minuteDegrees}deg)`;
    }
  }, [time]);

  
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setHourInput(value);
    if (value.length > 0) {
      const hours = parseInt(value);
      if (hours >= 1 && hours <= 12) {
        setTime(prev => ({ ...prev, hours }));
        setError("");
      } else {
        setError("Hours must be 01-12");
      }
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMinuteInput(value);
    if (value.length > 0) {
      const minutes = parseInt(value);
      if (minutes >= 0 && minutes <= 59) {
        setTime(prev => ({ ...prev, minutes }));
        setError("");
      } else {
        setError("Minutes must be 00-59");
      }
    }
  };

  
const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
  e.preventDefault();
  isDraggingRef.current = true;
  document.body.style.cursor = 'grabbing';  
  if (minuteHandRef.current) {
    minuteHandRef.current.classList.add('grabbing');
  }
};


  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDraggingRef.current || !clockFaceRef.current) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const clockRect = clockFaceRef.current.getBoundingClientRect();
    const centerX = clockRect.left + clockRect.width / 2;
    const centerY = clockRect.top + clockRect.height / 2;

    let angle = Math.atan2(clientX - centerX, centerY - clientY) * 180 / Math.PI;
    if (angle < 0) angle += 360;

    const newMinutes = Math.round(angle / 6) % 60;
    let newHours = time.hours;

    if (time.minutes > 45 && newMinutes < 15) {
      newHours = (newHours + 1) % 12 || 12;
    } else if (time.minutes < 15 && newMinutes > 45) {
      newHours = (newHours - 1 + 12) % 12 || 12;
    }

    setTime(prev => ({ ...prev, hours: newHours, minutes: newMinutes }));
    setHourInput(String(newHours).padStart(2, '0'));
    setMinuteInput(String(newMinutes).padStart(2, '0'));
  };

const stopDrag = () => {
  if (isDraggingRef.current) {
    isDraggingRef.current = false;
    document.body.style.cursor = ''; 
    if (minuteHandRef.current) {
      minuteHandRef.current.classList.remove('grabbing');
    }
  }
};


  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => handleDrag(e);
    const handleEnd = () => stopDrag();

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove as EventListener, { passive: false });
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove as EventListener);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [time.minutes, time.hours]);

  const [timeInWords, setTimeInWords] = useState("");

  useEffect(() => {
    setTimeInWords(timeToWords(time.hours, time.minutes));
  }, [time.hours, time.minutes]);


  const toggleFullscreen = () => {
  const geting_full_screen = document.getElementById('enable-full-screen');

  if (!document.fullscreenElement) {
    // Enter fullscreen
    if (geting_full_screen) {
      if (geting_full_screen.requestFullscreen) {
        geting_full_screen.requestFullscreen();
      } else if ((geting_full_screen as any).webkitRequestFullscreen) {
        (geting_full_screen as any).webkitRequestFullscreen();
      } else if ((geting_full_screen as any).msRequestFullscreen) {
        (geting_full_screen as any).msRequestFullscreen();
      }
    }
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  }
};


  return (
    <div className="clock-app">
      <img src="/Logo.png" alt="Logo" className="logo-container" />
      <div className="card-client" id="enable-full-screen">
        <div className="full-btn">
        <img src="/full.png" alt="full-screen" onClick={toggleFullscreen}/>
          
        </div>
       <h2 className="time-in-words card-clock-name" style={{border:error?"1px solid  red":undefined, background :error ?"#facaca":undefined, color: error ? "#f75e5e" : undefined }}>
  {error ? error : timeInWords}
</h2>

        
       
<div className="clock-container" ref={clockFaceRef}>
  <div className="clock-face">
    <div className="center-circle"></div>
    
    {/* Hour Hand */}
    <div className="hand hour-hand" ref={hourHandRef} >
      <img 
        src="/Hour.svg" 
        alt="Hour Hand" 
        className="hand-image"
        style={{
        transform: 'scaleY(-1)',
        top : 167,
        left: -8,
}}

      />
    </div>
    
    {/* Minute Hand */}
    <div 
      className={`hand minute-hand ${visible ? 'hovering' : ''}`}
      ref={minuteHandRef}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      <img 
        src="/Minute.svg" 
        alt="Minute Hand" 
        className="hand-image"
        style={{}}
      />
    </div>
    
    {visible && <p className="drag-me"><img src="/drag.png" alt="Drag indicator"/></p>}
  </div>
</div>
        <div className="input-card">
          <div className="input-container">
            <div className="time-input-group">
              <input
                type="text"
                className="time-input"
                value={hourInput}
                onChange={handleHourChange}
                placeholder="H"
                maxLength={2}
                inputMode="numeric"
              />
              <span className="time-separator">:</span>
              <input
                type="text"
                className="time-input"
                value={minuteInput}
                onChange={handleMinuteChange}
                placeholder="M"
                maxLength={2}
                inputMode="numeric"
              />
            </div>
          </div>
        </div>
        
      </div>
      <Content />
    </div>
  );
};

export default Clock;