import React, { useState, useRef, useEffect } from "react";
import "../css/productor.css";
import Content from "../homeclock/Content";

function Productor() {
  const [angle, setAngle] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("0");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const productorRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>("");
  const lastAngleRef = useRef<number>(0); 

  const handleMove = (clientX: number, clientY: number) => {
    if (!productorRef.current) return;
    const rect = productorRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.bottom; 

    const dx = clientX - centerX;
    const dy = centerY - clientY; 

    let angleRad = Math.atan2(dx, dy); 
    let angleDeg = angleRad * (180 / Math.PI);

    //  0–180 range
    angleDeg = Math.max(0, Math.min(180, angleDeg + 90));

    setAngle(Math.round(angleDeg));
    setInputValue(Math.round(angleDeg).toString());
    lastAngleRef.current = angleDeg;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  const startDrag = () => setIsDragging(true);
  const stopDrag = () => {
    setIsDragging(false);
    lastAngleRef.current = angle; 
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("mouseup", stopDrag);
      window.addEventListener("touchend", stopDrag);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [isDragging]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setError("");

    if (value === "") {
      setInputValue("");
      setAngle(0);
      lastAngleRef.current = 0;
      return;
    }

    if (!/^\d+$/.test(value)) {
      setError("Only numbers are allowed");
      return;
    }

    if (value.length > 3) {
      setError("Maximum 3 digits allowed");
      return;
    }

    const numValue = parseInt(value);
    if (numValue > 180) {
      setError("Maximum value is 180");
      return;
    }

    setInputValue(value);
    setAngle(numValue);
    lastAngleRef.current = numValue;
  };
  const toggleFullscreen = () => {
  const geting_full_screen = document.getElementById('enable-full-screen');

  if (!document.fullscreenElement) {
    // Enter fullscreen
    if (geting_full_screen) {
        // alert("heloo")
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
        // alert("hii")

      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  }
};
  return (
    <div className="main-parent">
      <div className="content-root">
        <div className="logo-div">
          <img src="./Logo.png" alt="Logo" className="logo-img" />
        </div>
        <div className="set-content">
          <div className="productor-div">
          <div className="card" id="enable-full-screen">
             <div className="full-btn">
        <img src="/full.png" alt="full-screen" onClick={toggleFullscreen}/>
          
        </div>
            <div className="card-header">
              <h2
                className="time-in-words card-clock-name"
                style={{
                  border: error ? "1px solid  red" : undefined,
                  background: error ? "#facaca" : undefined,
                  color: error ? "#f75e5e" : undefined,
                }}
              >
                {error ? error : <span className="title">Protractor</span>}
              </h2>
            </div>

            <div className="protractor-container">
              <img
                src="/Protactor.svg"
                className="protractor-image"
                alt="Protractor"
              />
              <div className="productor" ref={productorRef}>
                <div
                  className="needle all-scroll"
                  style={{
                    transform: `translateX(-50%) rotate(${angle - 90}deg)`,
                    transformOrigin: "bottom center",
                  }}
                  onMouseDown={startDrag}
                  onTouchStart={startDrag}
                />
                <div className="center-point" />
              </div>
            </div>

            <div className="input-card">
              <div className="input-container">
                <div className="input-group input-with-degree">
                  <input
                    type="number"
                    className={`time-input ${error ? "input-error" : ""}`}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    max="180"
                    maxLength={3}
                    onKeyPress={(e) =>
                      !/[0-9]/.test(e.key) && e.preventDefault()
                    }
                  />
                  {/* <span className="degree-symbol">°</span> */}
                </div>
              </div>
            </div>
          </div>
          </div>
          {/* <div className="cont-pa"> */}
          <Content/>
           
          {/* </div> */}
        </div>
        
      </div>
    </div>
  );
}

export default Productor;
