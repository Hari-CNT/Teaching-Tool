import React, { useState, useEffect, useRef } from "react";
import { createClockNumbers, timeToWords } from "./Jsfiles/function";
import "./css/clock.css";
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
  const [fullscreen,setFullscreen]=useState()
  const [visible, setVisible] = useState(true);
  const clockFaceRef = useRef<HTMLDivElement>(null);
  const hourHandRef = useRef<HTMLDivElement>(null);
  const minuteHandRef = useRef<HTMLDivElement>(null);
  const secondHandRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  // console.log(clockFaceRef,"clockFaceRef")
  useEffect(() => {
    if (clockFaceRef.current) {
      // console.log(clockFaceRef.current,"clockFaceRef.current")
      createClockNumbers(clockFaceRef.current);
    }
  }, []);

  // useEffect(()=>{
  //  const dragging = setTimeout(()=>{
  //   console.log("hello")
  //  },3000)
  // },[])

   useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // hide after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  // Update clock hands
  useEffect(() => {
    const hourDegrees = (time.hours % 12) * 30 + (time.minutes / 60) * 30;
    const minuteDegrees = time.minutes * 6;
    const secondDegrees = time.seconds * 6;

    if (hourHandRef.current) {
      hourHandRef.current.style.transform = `rotate(${hourDegrees}deg)`;
    }
    if (minuteHandRef.current) {
      minuteHandRef.current.style.transform = `rotate(${minuteDegrees}deg)`;
    }
    if (secondHandRef.current) {
      secondHandRef.current.style.transform = `rotate(${secondDegrees}deg)`;
    }
  }, [time]);

  // now Updating the  seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => ({ ...prev, seconds: new Date().getSeconds() }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle hour input changing
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    //  console.log(value,"value")
    // Only allow numbers and limit to 2 digits
    if (/^\d{0,2}$/.test(value)) {
      setHourInput(value);
      setError("");

      // Validate when we have 2 digits
      if (value.length === 2) {
        const hours = parseInt(value);
        if (hours >= 1 && hours <= 12) {
          // const hours=89

          //           setTime((prev) => {
          //   console.log({...prev,hours,"hello":"hi"}, '...prev');
          //   return { ...prev, hours };
          // });
          setTime((prev) => ({ ...prev, hours }));
        } else {
          setError("Hours must be between 01-12");
        }
      }
    }
  };
  // console.log(handleHourChange())
  // Handle minute input changes
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Only allow numbers and limit to 2 digits
    if (/^\d{0,2}$/.test(value)) {
      setMinuteInput(value);
      setError("");

      // Validate when we have 2 digits
      if (value.length === 2) {
        const minutes = parseInt(value);
        if (minutes >= 0 && minutes <= 59) {
          setTime((prev) => ({ ...prev, minutes }));
        } else {
          setError("Minutes must be between 00-59");
        }
      }
    }
  };

  // Handle blur to ensure valid values
  const handleBlur = () => {
    let valid = true;

    // Validate hours
    const hours = parseInt(hourInput);
    if (isNaN(hours) || hours < 1 || hours > 12) {
      setError("Invalid hours (01-12)");
      setHourInput(String(time.hours).padStart(2, "0"));
      valid = false;
    }

    // Validate minutes
    const minutes = parseInt(minuteInput);
    if (isNaN(minutes) || minutes < 0 || minutes > 59) {
      setError("Invalid minutes (00-59)");
      setMinuteInput(String(time.minutes).padStart(2, "0"));
      valid = false;
    }

    // If both valid, update time
    if (valid) {
      setTime({ hours, minutes, seconds: time.seconds });
      setError("");
    }
  };

  // Drag functionality (unchanged)
  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDraggingRef.current || !clockFaceRef.current) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const clockRect = clockFaceRef.current.getBoundingClientRect();
    const centerX = clockRect.left + clockRect.width / 2;
    const centerY = clockRect.top + clockRect.height / 2;

    let angle =(Math.atan2(clientX - centerX, centerY - clientY) * 180) / Math.PI;
    if (angle < 0) angle += 360;

    const newMinutes = Math.round(angle / 6) % 60;
    let newHours = time.hours;

    if (time.minutes > 45 && newMinutes < 15) {
      newHours = (newHours + 1) % 12 || 12;
    } else if (time.minutes < 15 && newMinutes > 45) {
      newHours = (newHours - 1 + 12) % 12 || 12;
    }

    setTime((prev) => ({ ...prev, hours: newHours, minutes: newMinutes }));
    setHourInput(String(newHours).padStart(2, "0"));
    setMinuteInput(String(newMinutes).padStart(2, "0"));
  };

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;

    if (minuteHandRef.current) {
      minuteHandRef.current.style.cursor = "grabbing";
    }
  };

  const stopDrag = () => {
    if (isDraggingRef.current && minuteHandRef.current) {
      isDraggingRef.current = false;
      minuteHandRef.current.style.cursor = "grab";
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleDrag(e);
    const handleTouchMove = (e: TouchEvent) => handleDrag(e);
    const handleMouseUp = () => stopDrag();
    const handleTouchEnd = () => stopDrag();

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [time.minutes, time.hours]);

  const [timeInWords, setTimeInWords] = useState("");

  useEffect(() => {
    setTimeInWords(timeToWords(time.hours, time.minutes));
  }, [time.hours, time.minutes]);

// const full_screen = () => {
//   // alert('hi');
//   const geting_full_screen = document.getElementById('enable-full-screen');

//   if (geting_full_screen) {
//     if (geting_full_screen.requestFullscreen) {
//       geting_full_screen.requestFullscreen();
//     } else if ((geting_full_screen as any).webkitRequestFullscreen) {
//       (geting_full_screen as any).webkitRequestFullscreen();
//     } else if ((geting_full_screen as any).msRequestFullscreen) {
//       (geting_full_screen as any).msRequestFullscreen();
//     }
//   } else {
//     console.warn('Element not found');
//   }
// };
const full_screen  = () => {
  const geting_full_screen = document.getElementById('enable-full-screen');

  if (!document.fullscreenElement) {
  //  alert("hii")
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
    // alert('closing')
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
      <div className="logo-container">
        <a href="/">
          <img src="/Logo.png" alt="Logo" />
        </a>
      </div>

      <div className="card-client" id="enable-full-screen">
        <div className="full-screen">
         <img src="/full.png" onClick={full_screen}/> 
        </div>
         <h2 className="time-in-words">{timeInWords}</h2>
      
        
        
        {/* clock face circle */}
        <div className="clock-container" ref={clockFaceRef}>
          
          <div className="clock-face" >
            <div className="center-circle"></div>
            <div className="hand hour-hand" ref={hourHandRef}></div>
          
      
          {!visible ?(
            <div
              className="hand minute-hand"
              ref={minuteHandRef}
              onMouseDown={startDrag}
              onTouchStart={startDrag}
              style={{ cursor: "grab" }}
            ></div>):(<><div
              className="hand minute-hand hovering"
              ref={minuteHandRef}
              onMouseDown={startDrag}
              onTouchStart={startDrag}
              style={{ cursor: "grab" }}
            ></div>
            <p className="drag-me"><img src="/drag.png"/></p></>)}
            {/* <div className="hand second-hand" ref={secondHandRef}></div> */}
          </div>
        </div>


{/* input feilds */}
        <div className="input-card">
          <div className="input-container">
            <div className="time-input-group">
              <input
                type="text"
                className="time-input"
                value={hourInput}
                onChange={handleHourChange}
                onBlur={handleBlur}
                placeholder="H"
                maxLength={2}
              />
              <span className="time-separator">:</span>
              <input
                type="text"
                className="time-input"
                value={minuteInput}
                onChange={handleMinuteChange}
                onBlur={handleBlur}
                placeholder="M"
                maxLength={2}
              />
            </div>
          </div>
        </div>
        {/* error  */}
        {error && <div className="error">{error}</div>}
      </div>
      {/* content file */}
      <Content />
    </div>
  );
};

export default Clock;
