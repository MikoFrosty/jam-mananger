import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

function FeatureList({ features }) {

  return (
    <List component="nav" aria-label="feature list">
      {features.map((feature, index) => (
        <React.Fragment key={index}>
          <ListItem sx={{padding: "10"}}>{feature}</ListItem>
          {index < features.length - 1 && (
            <Divider
              style={{
                backgroundColor: '#f1f1f1',
                width: '90%',
                marginLeft: "5%"
              }}
            />
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default FeatureList;
