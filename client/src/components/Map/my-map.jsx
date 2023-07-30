import React, { Component, useEffect, useState } from 'react';
import L from 'leaflet';
import {
	MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './my-map.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import config from "../../helper/config";
import { useAppSelector } from '../../app/hooks';
import Search_filter from '../Search_filter';

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;


const MyMap = () => {
	const state = useAppSelector((user) => user.user);
	const [markers, setmarkers] = useState([{ name: "London", coordinates: [51.505, -0.09], categories: [] }]);

	function ChangeMapView({ coords }) {
		const map = useMap();
		map.setView(coords, map.getZoom());

		return null;
	}

	function MultipleMarkers() {
		return markers.map((m) => {
			return (
				<Marker position={m.coordinates}>
					<Popup>
						<div>
							<h1>
								{m.name}
							</h1> 
							<div style = {{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "5px"}}>
								{
									m.categories.map((x) => {
										return (
											<div style = {{padding: "6px", borderRadius: "10px", backgroundColor: "lightgreen", minHeight: "5px"}}>
												<p style = {{fontSize: "14px", margin: "0"}}>{x}</p>
											</div>
										)
									})
								}
							</div>
						</div>
					</Popup>
				</Marker>
			);
		});
	}

	return (
		<>
			<Search_filter setmarkers={setmarkers} />
			<MapContainer center={markers[0].coordinates} zoom={13} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://tile.openstreetmap.de/{z}/{x}/{y}.png'
				/>
				<ChangeMapView coords={markers[0].coordinates} />
				<MultipleMarkers />
				{/* {
					markers.map((x, index) => {
						console.log(x);
						return (
							<Marker position={x.coordinates} >
								<Popup>
									<h1>
										{x.name}
									</h1>
								</Popup>
							</Marker>
						)
					})
				} */}
			</MapContainer>
		</>
	)
}

export default MyMap;
