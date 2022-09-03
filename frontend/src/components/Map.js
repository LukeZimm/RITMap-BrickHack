import React, {useState, useEffect} from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MdClose } from "react-icons/md";
import axios from 'axios';
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
    const [pins, setPins] = useState([]);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: api_key
    })

    const [map, setMap] = React.useState(null)


    const getMarkers= () => {
        /*
        axios.get(
            '/api/getpins'
        ).then(res => {
            console.log(res.data);
            setPins(res.data)
        });
        */
       setPins([{'id':'1', 'latitude': 43.0839605, 'longitude': -77.6764436, 'title': 'wtf ', 'text': 'RIT' }])
    }



    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        getMarkers();
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    const onClick = React.useCallback(function callback(event, item) {
        console.log(event);
        if (item.indexOf('marker') !== -1) {
            console.log(item);
            var popup = document.getElementById(item);
            

            if (popup.style.display !== "block") {
                popup.style.display = "block";
            } else {
                popup.style.display = "none";
            };
        }
        else if (item ==='map') {
            console.log(event.lat)
            
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
            {/*
            <Marker
                key={'test2'}
                position={{ lat: 43.084737, lng: -77.6791509 }}
                onClick={e => onClick(e, 'marker')}
                >
                <div id="overlay" onClick={e => onClick(e, 'marker')}>
                    <div className='close-overlay'>
                            <MdClose class='close-button' />
                        </div>
                    <div className='popup'>
                        <h2>Title</h2>
                        <div>Overlay Text</div>
                    </div>
                </div>
          </Marker>
                      */}
            {pins.map(pin => (
                    <Marker
                        key={pin.id}
                        position={{ lat: pin.latitude, lng: pin.longitude }}
                        onClick={e => onClick(e, `marker:${pin.id}`)}
                    >
                        <div id={`marker:${pin.id}`} className="overlay" onClick={e => onClick(e,`marker:${pin.id}`)}>
                            <div className='close-overlay'>
                                <MdClose class='close-button' />
                            </div>
                            <div className='popup'>
                                <h2>{pin.title}</h2>
                                <div>{pin.text}</div>
                            </div>
                        </div>
                    </Marker>
            ))}

            {/*id, title, text, lat, lng, catagory"*/}
        </GoogleMap>
    ) : <></>
}

export default React.memo(Map)