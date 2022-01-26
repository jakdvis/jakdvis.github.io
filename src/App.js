import React from 'react';
import {TileLayer, Marker, Popup, MapContainer} from "react-leaflet";
import { geolocated } from "react-geolocated";

const DEFAULT_LONG = 40;
const DEFAULT_LAT = -78;

class App extends React.Component{
    render(){

        const longitude = this.props.coords ? this.props.coords.longitude: DEFAULT_LONG;
        const latitude = this.props.coords ? this.props.coords.latitude: DEFAULT_LAT;
        return (
            <MapContainer         center={[longitude, latitude]}
                                  zoom={13}
                                  scrollWheelZoom={true}
                                  >
                <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                ></TileLayer>
                {
                    !this.props.coords ?
                        <div className="loading">Loading</div>
                        :
                        <Marker
                            position={[latitude, longitude]}
                        >
                            <center>{[longitude,latitude]}</center>
                            <Popup>
                                {[latitude]}, {[longitude]}
                            </Popup>
                        </Marker>

                }
            </MapContainer>

        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
    },
    watchPosition: true,
    userDecisionTimeout: null,
    suppressLocationOnMount: false,
    geolocationProvider: navigator.geolocation,
    isOptimisticGeolocationEnabled: true
})(App);
