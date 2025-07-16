import React, { useState, useRef, useEffect } from 'react';
import '../css/graphcoordinate.css';
import { createAxesAndGrid, addLabelsAtPoint, drawLines } from '../Jsfiles/grap_coordinate';

interface Point {
  x: number;
  y: number;
}

interface PointElement {
  point: HTMLDivElement;
  label: HTMLDivElement;
}

const GraphCoordinate: React.FC = () => {
  const graphRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [clickCount, setClickCount] = useState(0);
  const [coordinates, setCoordinates] = useState('');
  const [showError, setShowError] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const pointsElementsRef = useRef<PointElement[]>([]);
  
  const maxClicks = 11;
  const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K'];

  useEffect(() => {
    if (graphRef.current) {
      createAxesAndGrid(graphRef.current);
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current && points.length >= 2) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 500, 500); // Clear the canvas before redrawing
        drawLines(ctx, points);
      }
    } else if (canvasRef.current && points.length < 2) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 500, 500); // Clear the canvas when less than 2 points
      }
    }
  }, [points]);

  const handleGraphClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clickCount >= maxClicks) {
      setShowError(true);
      return;
    }

    if (!graphRef.current) return;

    const rect = graphRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const width = rect.width;
    const height = rect.height;
    const padding = 50;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;
    
    let graphX = ((x - padding) / graphWidth) * 10;
    let graphY = 10 - ((y - padding) / graphHeight) * 10;
    
    graphX = Math.round(Math.max(0, Math.min(10, graphX)));
    graphY = Math.round(Math.max(0, Math.min(10, graphY)));
    
    const pixelX = padding + (graphX / 10) * graphWidth;
    const pixelY = padding + ((10 - graphY) / 10) * graphHeight;
    
    const isDuplicate = points.some(point => 
      Math.abs(point.x - pixelX) < 5 && 
      Math.abs(point.y - pixelY) < 5
    );
    
    if (isDuplicate) return;
    
    setShowError(false);
    
    const pointElement = addLabelsAtPoint(graphRef.current, graphX, graphY, labels[clickCount]);
    pointsElementsRef.current.push(pointElement);
    
    setPoints(prev => [...prev, { x: pixelX, y: pixelY }]);
    setCoordinates(`Clicked at: (${graphX}, ${graphY})`);
    setClickCount(prev => prev + 1);
  };

  const handleUndo = () => {
    if (clickCount > 0) {
      const lastElements = pointsElementsRef.current.pop();
      if (lastElements) {
        lastElements.point.remove();
        lastElements.label.remove();
      }
      
      setPoints(prev => {
        const newPoints = prev.slice(0, -1);
        return newPoints;
      });
      setClickCount(prev => prev - 1);
      
      if (clickCount > 1) {
        const lastPoint = points[clickCount - 2];
        const graphX = Math.round((lastPoint.x - 50) / 400 * 10);
        const graphY = 10 - Math.round((lastPoint.y - 50) / 400 * 10);
        setCoordinates(`Clicked at: (${graphX}, ${graphY})`);
      } else {
        setCoordinates('');
      }
      
      // Clear the canvas manually after undo to ensure no lingering lines
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, 500, 500);
        }
      }
    }
  };

  return (
    <div className="graph-app">
      <div 
        ref={graphRef} 
        className="graph-container" 
        onClick={handleGraphClick}
      >
        <canvas ref={canvasRef} className="graph-canvas" width={500} height={500} />
        
        {showError && <div className="error-message">Maximum 11 points allowed</div>}
      </div>
      <br></br>
    
    <div className='show-table-content'>I'M t</div>


      <div className='btn-parent'>
        <button 
        className="undo-btn" 
        onClick={handleUndo} 
        disabled={clickCount === 0}
      >
        Undo
      </button>
        <button 
        className="undo-btn" 
        onClick={handleUndo} 
      >
        ShowTable
      </button>
      <div className="coordinates-display">{coordinates}</div>
      </div>
      
    </div>
  );
};

export default GraphCoordinate;