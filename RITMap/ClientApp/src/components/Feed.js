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

    function reportPin(pid) {
        axios.post(`/api/report/${pid}`);
        alert('Reported post, thank you!');
    }
    return <>
        <section className="bg-white dark:bg-gray-900">
            <div className="container max-w-4xl px-6 py-10 mx-auto">
            <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-white">Feed</h1>
            {pins.map(pin => 
                <div className="mt-12 space-y-8" key={pin.id}>
                <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
                    <button className="flex items-center justify-between w-full p-8">
                        <h1 className="font-semibold text-gray-700 dark:text-white">{pin.title}</h1>
                        <h1 className="font-semibold text-gray-700 dark:text-gray-500">Lon: {pin.longitude} Lat: {pin.latitude}</h1>
                        <a onClick={() => reportPin(`${pin.id}`)} className="text-sm text-blue-500 hover:underline">Report</a>
                    </button>

                    <hr className="border-gray-200 dark:border-gray-700"/>
                    
                    <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                        {pin.text}
                    </p>
                </div>
            </div>

            )}
        </div>
        </section>
    </>;
}

export default Feed;
