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

    const onLoad = React.useCallback(function callback(map) {
        getMarkers();
    }, [])


    return <>
        {pins.map(pin => 
            <div key={pin.id}>
                <section  className="bg-white dark:bg-gray-900">
                    <div className="container max-w-4xl px-6 py-10 mx-auto">
                        <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-white">{pin.title}</h1>

                        <div className="mt-12 space-y-8">
                            <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
                                    <h1 className="font-semibold text-gray-700 dark:text-white">Latitude: {pin.latitude} Longitude: {pin.longitude}</h1>


                                <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                                   {pin.text}
                                </p>
                            </div>
                            </div>
                        </div>
                </section>
            </div>
        )}
    </>;
}

export default Feed;
