// Gp5Page.tsx
import React from 'react';
import { GP5Uploader } from '../components/GP5Uploader';
import  GP5Browser  from '../components/GP5Browser';
import Header from './Header';


const Gp5Page = () => {
  return (
    <div>
        <Header/>
      <GP5Uploader />
      <GP5Browser />
    
    </div>
  );
};

export default Gp5Page;
