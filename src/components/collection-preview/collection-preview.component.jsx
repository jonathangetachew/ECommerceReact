import React from 'react';
import { Link } from 'react-router-dom';

import './collection-preview.styles.scss';

import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({ title, items }) => {
  return (
    <div className='collection-preview'>
      <h1 className='title'><Link to={`/shop/${title.toLowerCase()}`}>{title.toUpperCase()}</Link></h1>
      <div className='preview'>
        {items
            .filter((_, index) => index < 4)
            .map((item) => (
              <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default CollectionPreview;