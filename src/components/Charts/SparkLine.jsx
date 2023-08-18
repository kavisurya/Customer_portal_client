import React from 'react'

import Plot from 'react-plotly.js';
const SparkLine = ({id,height,width,color,data,type,currentColor,xaxis,yaxis}) => {

	const x = data.map((i) => (i.x))
	const y = data.map((i) => (i.yval))

	const newdata = [
  {
    x: x,
    y: y,
    type: 'scatter',
    mode: 'lines',
    line: { color: color },
  },
];

const layout = {
  width: width,
  height: height,
  xaxis: {
    
    showgrid: false,
    showticklabels: false,
  },
  yaxis: {
    
    showgrid: false,
    showticklabels: false,
  },
   margin: {
    l: 50, // left margin
    r: 50, // right margin
    t: 50, // top margin
    b: 50, // bottom margin
  },
};

const config = {
  autosize: false,
};


	return (

		<Plot data={newdata} layout={layout} config={config}/>
		
		)
}

export default SparkLine