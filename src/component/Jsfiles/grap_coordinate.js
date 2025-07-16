export const createAxesAndGrid = (graph) => {
  const width = graph.offsetWidth;
  const height = graph.offsetHeight;
  const padding = 50;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  // Create x-axis
  const xAxis = document.createElement('div');
  xAxis.className = 'axis x-axis';
  graph.appendChild(xAxis);

  // Create y-axis
  const yAxis = document.createElement('div');
  yAxis.className = 'axis y-axis';
  graph.appendChild(yAxis);

  // Create grid lines
  for (let i = 0; i <= 10; i++) {
    const yGrid = document.createElement('div');
    yGrid.className = 'grid-line y-grid';
    yGrid.style.left = `${padding + (i / 10) * graphWidth}px`;
    graph.appendChild(yGrid);

    const xGrid = document.createElement('div');
    xGrid.className = 'grid-line x-grid';
    xGrid.style.top = `${padding + (i / 10) * graphHeight}px`;
    graph.appendChild(xGrid);
  }

  // Create x-axis ticks and labels
  for (let i = 0; i <= 10; i++) {
    const tick = document.createElement('div');
    tick.className = 'tick x-tick';
    tick.style.left = `${padding + (i / 10) * graphWidth}px`;
    graph.appendChild(tick);

    const label = document.createElement('div');
    label.className = 'tick-label x-label';
    label.style.left = `${padding + (i / 10) * graphWidth}px`;
    label.textContent = i.toString();
    graph.appendChild(label);
  }

  // Create y-axis ticks and labels
  for (let i = 0; i <= 10; i++) {
    const tick = document.createElement('div');
    tick.className = 'tick y-tick';
    tick.style.top = `${padding + (i / 10) * graphHeight}px`;
    graph.appendChild(tick);

    const label = document.createElement('div');
    label.className = 'tick-label y-label';
    label.style.top = `${padding + (i / 10) * graphHeight}px`;
    label.textContent = (10 - i).toString();
    graph.appendChild(label);
  }
};

export const addLabelsAtPoint = (graph, x, y, label) => {
  const padding = 50;
  const width = graph.offsetWidth;
  const height = graph.offsetHeight;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const point = document.createElement('div');
  point.className = 'point';
  point.style.left = `${padding + (x / 10) * graphWidth}px`;
  point.style.top = `${padding + ((10 - y) / 10) * graphHeight}px`;
  graph.appendChild(point);

  const labelElement = document.createElement('div');
  labelElement.className = 'point-label';
  labelElement.textContent = label;
  labelElement.style.left = `${padding + (x / 10) * graphWidth + 10}px`;
  labelElement.style.top = `${padding + ((10 - y) / 10) * graphHeight - 20}px`;
  graph.appendChild(labelElement);

  return { point, label: labelElement };
};

export const drawLines = (ctx, points) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  if (points.length >= 2) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = 'brown';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
};
