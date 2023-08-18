import React from 'react'
import Plot from 'react-plotly.js';

const Stacked = ({data,height,width}) => {

const layout = {
width: width,
  height: height,
  barmode: 'stack',
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


	return (
		 <Plot
      data={data}
      layout={layout}
    />
		)
}

export default Stacked