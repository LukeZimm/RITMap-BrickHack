import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MdClose } from "react-icons/md";
import './Maps.css';
const api_key = 'AIzaSyDH-KRabVOXL9wpJvRoeMJRNvGLn9Qd9wI';

const containerStyle = {
    width: '1200px',
    height: 'calc(100vh - 100px)'
};

const center = {
    lat: 43.0839605,
    lng: -77.6764436
};


function Map() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: api_key
    })

    const [map, setMap] = React.useState(null)
    const getMarkers= () => {
        /*
        */
    }

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    const onClick = React.useCallback(function callback(event, item) {
        console.log(event.latLng.lat(), event.latLng.lng())
        if (item === 'marker') {
            var popup = document.getElementById("overlay");
            console.log(popup);
            
            if (popup.style.display !== "block") {
                popup.style.display = "block";
            } else {
                popup.style.display = "none";
            };
        }
        else if (item ==='map') {

            
        }
    }, []);

    return isLoaded ? (
        <GoogleMap
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={e => onClick(e, 'map')}
            mapContainerClassName="map"
        >
            <Marker
                key={'test2'}
                title={"This is a title"}
                position={{ lat: 43.084737, lng: -77.6791509 }}
                onClick={e => onClick(e, 'marker')}
            >
                <div id="overlay">
                    <div className='close-overlay' onClick={e => onClick(e, 'map')}>
                        <MdClose style={{'width': '64px', 'height':'64px'}} />
                    </div>
                    <div id="text">Overlay Text</div>
                </div>
          </Marker>

            <Marker
                key={'test2'}
                title={"This is a title"}
                position={{ lat: 43.0839635, lng: -77.6764336 }}
                onClick={onClick}
                
            />
        </GoogleMap>
    ) : <></>
}

export default React.memo(Map)