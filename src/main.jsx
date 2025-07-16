import React from 'react'
import ReactDOM from 'react-dom/client'
import HomeClock from './component/homeclock/HomeClock'
import './index.css'
import Productor from './component/productor/Productor'
import GraphCoordinate from './component/graphco_ordinate/GraphCoordinate'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HomeClock/>
    <Productor/>
    <GraphCoordinate/>
  </React.StrictMode>
)
