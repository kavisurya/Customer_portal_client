import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

const Timeline1 = ({ data }) => {
  return (
    <Timeline position="alternate">
      {data.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            {index < data.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <h4 style={{ fontFamily: 'Poppins, sans-serif' }}>{item.date}</h4>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: "bold" }}>{item.description}</p>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default Timeline1;
