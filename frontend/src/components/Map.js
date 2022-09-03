import React, {useState, useEffect} from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MdClose, MdFormatLineSpacing } from "react-icons/md";
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
    const [newpin, setNewPin] = useState(null);

    const [formtitle, setFormTitle] = useState('');
    const [formtext, setFormText] = useState('');

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


    const createPin = () => {

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
            setNewPin({'latitude': event.latLng.lat(), 'longitude': event.latLng.lng()})
            console.log()
            
        }
    }, []);

    const onClickForm = React.useCallback(function callback(event, item) {
        setNewPin(null)
    }, []);

    function OnSubmitForm(e) {
        e.preventDefault();
        axios.post('/api/createpin', {
            latitude: newpin.latitude,
            longitude: newpin.longitude,
            title: formtitle,
            text: formtext
        }).then(res => {
            console.log(res.data);
            getMarkers();
            setNewPin(null);
            setFormTitle('');
            setFormText('');
        })

    }

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
            {newpin && (<>
                <Marker
                    key={'new'}
                    position={{ lat: newpin.latitude, lng: newpin.longitude }}
                ></Marker>
                
                <div className="overlay" style={{'display':'block'}} >
                    <div className='close-overlay' onClick={e => onClickForm(e)}>
                        <MdClose class='close-button' />
                    </div>
                    <div className='popup'>
                        <h2>Create Pin</h2>
                        <form type="post">
                            <label>Title</label>
                            <input type="text" name="title" value={formtitle} onChange={e => setFormTitle(e.target.value)}/>
                            <label>Text</label>
                            <input type="text" name="text" value={formtext} onChange={e => setFormText(e.target.value)}/>
                            <button onClick={e => OnSubmitForm(e)}>Submit</button>
                        </form>
                    </div>
                </div>

                </>)}

            {/*id, title, text, lat, lng, catagory"*/}
        </GoogleMap>
    ) : <></>
}

export default React.memo(Map)