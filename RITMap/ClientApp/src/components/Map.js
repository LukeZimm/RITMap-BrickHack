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
        axios.get(
            '/api/getpins'
        ).then(res => {
            console.log(res.data);
            setPins(res.data)
        });
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

    function reportPin(pid) {
        axios.post('/api/reportpin', {
            pin_id:pid
        });
    }
    function OnSubmitForm(e) {
        e.preventDefault();
        axios.post('/api/createpin', {
            latitude: newpin.latitude,
            longitude: newpin.longitude,
            title: formtitle,
            text: formtext
        }).then(res => {
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
            {pins.map(pin => (
                    <Marker
                        key={pin.id}
                        position={{ lat: pin.latitude, lng: pin.longitude }}
                        onClick={e => onClick(e, `marker:${pin.id}`)}
                    >
                        <div id={`marker:${pin.id}`} style={{"display":"none"}} className="relative flex justify-center">
                            <div >
                                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                                    <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                        <div>

                                            <div className="mt-2 text-center">
                                                <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">{pin.title}</h3>
                                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                    {pin.text}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-5 sm:flex sm:items-center sm:justify-between">
                                            <a onClick={() => reportPin(`${pin.id}`)} className="text-sm text-blue-500 hover:underline">Report</a>

                                            <div className="sm:flex sm:items-center ">
                                                <button onClick={e => onClick(e,`marker:${pin.id}`)} className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Marker>
            ))}
            {newpin && (<>
                <Marker
                    key={'new'}
                    position={{ lat: newpin.latitude, lng: newpin.longitude }}
                ></Marker>
                <div className="relative flex justify-center">

                    <div 
                        className="fixed inset-0 z-10 overflow-y-auto" 
                        aria-labelledby="modal-title" role="dialog" aria-modal="true"
                    >
                        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

                                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                                    <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                        Create Pin
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Leave a digital comment on the map.
                                    </p>

                                    <form className="mt-4" action="#">

                                        <label className="block mt-3" for="text">
                                            <input type="text" onChange={e => setFormText(e.target.value)} name="title" id="email" placeholder="Title" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                                        </label>

                                        <label className="block mt-3" for="text">
                                            <input type="text" onChange={e => setFormTitle(e.target.value)} name="body" id="email" placeholder="Text" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                                        </label>

                                        <div className="mt-4 sm:flex sm:items-center sm:-mx-2" onClick={e => onClickForm(e)}>
                                            <button type="button" className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                                Cancel
                                            </button>

                                            <button type="button" className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" onClick={e => OnSubmitForm(e)}>
                                                Create Pin
                                            </button>
                                        </div>
                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
                </>)}

            {/*id, title, text, lat, lng, catagory"*/}
        </GoogleMap>
    ) : <></>
}

export default React.memo(Map)