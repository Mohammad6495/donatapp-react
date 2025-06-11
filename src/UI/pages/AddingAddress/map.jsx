import React, { useState, useEffect, useRef } from 'react';
import NeshanMap from 'react-neshan-map-leaflet';
import pin from "../../../assets/images/colorPin.png";

const MyMap = ({ centerPosition, setCenterPosition }) => {
    ////
    const mapRef = useRef();
    const leafletRef = useRef();
    const userLocationIconRef = useRef();
    const userLocationMarkerRef = useRef();
    ////
    const onMapInit = (L, myMap) => {
        
        mapRef.current = myMap;
        leafletRef.current = L;
        mapRef.current = myMap;
        leafletRef.current = L;
        ////
        userLocationIconRef.current = L.icon({
            iconUrl: pin,
            iconSize: [30, 30],
        });
        ////
        userLocationMarkerRef.current = new L.Marker(centerPosition, {
            draggable: true,
            icon: userLocationIconRef.current,
        });
        myMap.addLayer(userLocationMarkerRef.current);
        myMap.flyTo({ lat: centerPosition[0], lng: centerPosition[1] }, myMap.getZoom());
        //////////// Handle Click ////////////
        myMap.on("click", function (e) {
            /////////
            setCenterPosition([e.latlng.lat, e.latlng.lng])
            /////////
            if (userLocationMarkerRef.current)
                myMap.removeLayer(userLocationMarkerRef.current);
            ////////
            setTimeout(() => {
                myMap.flyTo(e.latlng, myMap.getZoom());
                userLocationMarkerRef.current = new L.Marker(e.latlng, {
                    draggable: true,
                    icon: userLocationIconRef.current,
                });
                myMap.addLayer(userLocationMarkerRef.current);
            }, 0);
        });
    }
    ///
    return (
        <NeshanMap
            style={{
                width: "100%",
                height: "400px",
            }}
            options={{
                key: "web.403df50a10684a40af12ca02cd82a9ef",
                center: centerPosition,
                zoom: 13,
            }}
            onInit={onMapInit}
        />
    )


}

export default MyMap;