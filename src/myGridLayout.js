import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const MyGridLayout = () => {
  const initialLayout = [
    { i: 'static', x: 0, y: 0, w: 4, h: 4, static: true },
    { i: 'a', x: 4, y: 0, w: 4, h: 4, minW: 2, maxW: 6 },
    { i: 'b', x: 8, y: 0, w: 4, h: 4 },
    { i: 'c', x: 0, y: 4, w: 4, h: 4 },
    { i: 'd', x: 4, y: 4, w: 4, h: 4 },
    { i: 'e', x: 8, y: 4, w: 4, h: 4 },
    { i: 'f', x: 0, y: 8, w: 4, h: 4 },
    { i: 'g', x: 4, y: 8, w: 4, h: 4 },
    { i: 'h', x: 8, y: 8, w: 4, h: 4 },
    { i: 'graph', x: 0, y: 12, w: 12, h: 6 },
  ];

  const [items, setItems] = useState(() => {
    const savedLayout = JSON.parse(localStorage.getItem('layout'));
    return savedLayout || initialLayout;
  });

  useEffect(() => {
    localStorage.setItem('layout', JSON.stringify(items));
  }, [items]);

  const handleDeleteItem = (itemToDelete) => {
    const updatedItems = items.filter(item => item.i !== itemToDelete.i);
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    const newItem = {
      i: `item-${items.length + 1}`,
      x: 0,
      y: 0,
      w: 4,
      h: 4,
    };
    setItems([...items, newItem]);
  };

  const renderGridItems = () => {
    return items.map((item) => {
      if (item.i === 'graph') {
        return (
          <div key={item.i} style={{ background: '#ffffff', border: '1px solid #ccc', padding: '10px', overflow: 'hidden' }}>
            <h2>Graph Component</h2>
            <LineChart width={item.w * 100} height={item.h * 50} data={data}>
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={{ stroke: '#8884d8', strokeWidth: 4 }} />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </div>
        );
      } else if (item.i === 'static') {
        return (
          <div key={item.i} style={{ background: '#f0f0f0', border: '1px solid #ccc', padding: '10px', position: 'relative' }}>
            <h2>Static Component</h2>
            <p>This component does not change and remains static.</p>
          </div>
        );
      } else {
        return (
          <div key={item.i} style={{ background: '#ff8a80', position: 'relative' }}>
            <IconButton
              aria-label="delete"
              style={{ position: 'absolute', top: 0, right: 0 }}
              onClick={() => handleDeleteItem(item)}
            >
              <DeleteIcon />
            </IconButton>
            Item {item.i.toUpperCase()}
          </div>
        );
      }
    });
  };

  const data = [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 40 },
    { name: 'Mar', value: 35 },
    { name: 'Apr', value: 50 },
    { name: 'May', value: 55 },
    { name: 'Jun', value: 60 },
  ];

  return (
    <div>
      <button onClick={handleAddItem} style={{ position: 'fixed', top: '10px', left: '10px', zIndex: '999' }}>Add Item</button>
      <GridLayout
        className="layout"
        layout={items}
        cols={12}
        rowHeight={30}
        width={1200}
        isDraggable={true}
        isResizable={true}
        onLayoutChange={(newLayout) => setItems(newLayout)}
      >
        {renderGridItems()}
      </GridLayout>
    </div>
  );
};

export default MyGridLayout;
