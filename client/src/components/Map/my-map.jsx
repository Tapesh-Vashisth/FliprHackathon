import React, { Component, useEffect, useState } from 'react';
import L from 'leaflet';
import {
    MapContainer, TileLayer, Marker, Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './my-map.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import config from "../../helper/config";
import Search_filter from '../Search_filter';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;


const MyMap = () => {
	const position = [51.505, -0.09]
	
	return (
		<>
			<Search_filter />
			<MapContainer center={position} zoom={13} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://tile.openstreetmap.de/{z}/{x}/{y}.png'
				/>
				<Marker position={position} >
					<Popup>
						<h1>
							A pretty CSS3 popup. <br /> Easily customizable.
						</h1>
					</Popup>
				</Marker>
			</MapContainer>
		</>
	)
}

export default MyMap;
