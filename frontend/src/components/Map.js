import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import {MdBlurOn } from "react-icons/md";
// import 'google-map-react/dist/index.css'

const api_key = 'AIzaSyDH-KRabVOXL9wpJvRoeMJRNvGLn9Qd9wI';


const containerStyle = {
  width: '1200px',
  height: '800px'
};

const center = {
  lat: 43.0839605,
  lng: -77.6764436
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: api_key
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  const onClick = React.useCallback(function callback(event) {
    console.log(event.latLng.lat(), event.latLng.lng())
    }, []);
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
                key={'test'}
                position={{ lat: 43.0839607, lng: -77.6764436 }}
            />
        <Marker
                key={'test2'}
                title={"This is a title"}
                position={{ lat: 43.0839635, lng: -77.6764336 }}
                onClick={onClick}
            />
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)