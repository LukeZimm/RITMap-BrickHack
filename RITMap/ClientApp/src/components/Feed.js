import React, {useState, useEffect} from 'react'
import axios from 'axios';

function Feed() {
    const [pins, setPins] = useState([]);
    const getMarkers= () => {
        axios.get(
            '/api/getpins'
        ).then(res => {
            setPins(res.data);
        });
    }

    useEffect(()=>{
        getMarkers();
    }, [])


    return <>
        <section className="bg-white dark:bg-gray-900">
            <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-white">Feed</h1>
            {pins.map(pin => 
                <div key={pin.id}>
                    <div className="container max-w-4xl px-6 py-10 mx-auto">
                        <div className="mt-12 space-y-8 text-center">
                            <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
                                <h1 className="font-semibold text-gray-700 dark:text-white" >{pin.title}</h1>
                                <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                                    {pin.text}
                                    <br />
                                    Latitude: {pin.latitude} Longitude: {pin.longitude}
                                </p>
                            </div>
                            </div>
                        </div>
                </div>
            )}
        </section>
    </>;
}

export default Feed;
