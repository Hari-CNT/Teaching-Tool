// import React from 'react'
// import "./css/clock.css";
// function Content() {
//   return (
//         <div className='content-parent' >
//          <h2 className="text-2xl font-bold mb-3">Telling Time Made Simple!</h2>
//        <div>

//        </div>
//       <div className="task">
//         <img src="../../public/clock-one.jpg" width={50} height={50}/>
//             <ul className="list-disc ml-6 space-y-2 text-gray-800">
//                <li> Learn both analog and digital clocks </li>
//             </ul>
//       </div>
//       <div className="task">
//         <img src="../../public/clock-one.jpg" width={50} height={50}/>
//            <ul className="list-disc ml-6 space-y-2 text-gray-800">
//                <li> Practice with “quarter past”, “half past”, and more </li>
//             </ul>
//       </div>

//        <div className="task">
//         <img src="../../public/clock-one.jpg" width={50} height={50}/>
//            <ul className="list-disc ml-6 space-y-2 text-gray-800">
//                <li> Play and learn with interactive clock activities</li>
//             </ul>
//       </div>

//        <div className="task">
//         <img src="../../public/clock-one.jpg" width={50} height={50}/>
//            <ul className="list-disc ml-6 space-y-2 text-gray-800">
//                <li> Hear the time spoken aloud  </li>
//             </ul>
//       </div>

//        <div className="task">
//         <img src="../../public/clock-one.jpg" width={50} height={50}/>
//            <ul className="list-disc ml-6 space-y-2 text-gray-800">
//                <li> Built for kids ages 5 to 10 </li>
//             </ul>
//       </div>

//          </div>
//   )
// }

// export default Content

import React from "react";

function Content() {
  return (
    <div className="content-parent-container">
      <h2>Teaching Time Tool</h2>
      <div className="content-text">
        <p>
          Teaching Time Tool is a fun and interactive way for kids to learn how
          to tell time using both analog and digital clocks. Children can
          explore how the hour and minute hands move on an analog clock and also
          learn to read numbers on a digital clock.
        </p>
        <p>
          The tool helps kids understand time phrases like “quarter past five”
          or “half past two”, and match them to the correct clock display. With
          bright visuals, simple instructions, and playful practice, it’s
          perfect for helping young learners build confidence in telling
          time—the fun and easy way!
        </p>
        <div className="task-container">
          <div className="task">
            {/* <div className="image-container">
              <img src="/clock-one.jpg" />
            </div> */}

            <ul className="list-disc ml-6 space-y-2 text-gray-800">
              <li> Practice with “quarter past”, “half past”, and more </li>
            </ul>
          </div>
          <div className="task">
            {/* <div className="image-container">
              <img src="/clock-five.avif" />
            </div> */}
            <ul className="list-disc ml-6 space-y-2 text-gray-800">
              <li> Practice with “quarter past”, “half past”, and more </li>
            </ul>
          </div>
          <div className="task">
            {/* <div className="image-container">
              <img src="/clock-three.jpg" />
            </div> */}
            <ul className="list-disc ml-6 space-y-2 text-gray-800">
              <li> Practice with “quarter past”, “half past”, and more </li>
            </ul>
          </div>
          <div className="task">
            {/* <div className="image-container">
              <img src="/clock-four.webp" />
            </div> */}
            <ul className="list-disc ml-6 space-y-2 text-gray-800">
              <li> Practice with “quarter past”, “half past”, and more </li>
            </ul>
          </div>
        </div>
        <p>
          Whether they're just starting out or need extra
          practice, this tool makes time-telling feel like a game—engaging,
          colorful, and made just for kids!
        </p>
      </div>
    </div>
  );
}

export default Content;
