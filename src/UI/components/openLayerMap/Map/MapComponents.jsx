import React, { useEffect, useRef, useState } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const MapComponent = ({children}) => {
  const mapRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    mapRef.current = map;

    const handlePointerDown = () => {
      setIsDragging(true);
    };

    const handlePointerUp = (event) => {
      if (isDragging) {
        setIsDragging(false);
        const clickedCoordinate = map.getEventCoordinate(event);
        console.log('Clicked Coordinate:', clickedCoordinate);
        // do something with the clicked coordinate, e.g. select a feature
      }
    };

    map.getViewport().addEventListener('pointerdown', handlePointerDown);
    map.getViewport().addEventListener('pointerup', handlePointerUp);

    return () => {
      map.getViewport().removeEventListener('pointerdown', handlePointerDown);
      map.getViewport().removeEventListener('pointerup', handlePointerUp);
    };

  }, [isDragging]);

  return (
    <div id="map">{children}</div>
  );
};

export default MapComponent;