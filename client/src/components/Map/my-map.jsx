import React, { Component, useEffect } from 'react';
import L from 'leaflet';
import {
    MapContainer, TileLayer, Marker, Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './my-map.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


const MyMap = () => {
	const position = [51.505, -0.09]
	
	useEffect(() => {
		console.log("huu");
	}, []);
	return (
		<MapContainer center={position} zoom={13} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={position}>
				<Popup>
					<h1>
						A pretty CSS3 popup. <br /> Easily customizable.
					</h1>
				</Popup>
			</Marker>
		</MapContainer>
	)
}

export default MyMap;