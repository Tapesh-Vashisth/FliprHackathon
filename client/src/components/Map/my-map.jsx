import React, { Component, useEffect, useState } from 'react';
import L from 'leaflet';
import {
	MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './my-map.css';
import axiosInstance from "../../api/axiosInstance"
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Search_filter from '../Search_filter';
import PlaceSidebar from '../PlaceSidebar';
import AddADescription from '../AddADescription';
import { userActions } from '../../features/userSlice';
import { toast } from 'react-toastify';
import Header from '../Header/Header';

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MyMap = () => {
	const [showAddFavorite, setShowAddFavorite] = useState(false);
	const state = useAppSelector((user) => user.user);
	const dispatch = useAppDispatch();
	const [markers, setmarkers] = useState([{ name: "London", coordinates: [51.505, -0.09], categories: [], place_id: "51887a0b35540555c0596a37555282904240f00101f9011ffe010000000000c00207" }]);
	const [showSidebar, setShowSidebar] = useState(false);
	const [data, setData] = useState({ place_name: null, place_id: null, coordinates: null, categories: [] });

	const checkfav = (place_id) => {
		let favs = state.favs
		for (let i = 0; i < favs.length; i++) {
			if (favs[i].place === place_id) return true
		}
		return false
	}

	function ChangeMapView({ coords }) {
		const map = useMap();
		map.setView(coords, map.getZoom());

		return null;
	}

	const handleFavorite = async (data) => {
		setData({
			place_name: data.name,
			place_id: data.place_id,
			coordinates: data.coordinates,
			categories: data.categories
		})


		if (!checkfav(data.place_id)) {
			setShowAddFavorite(true);
		} else {
			try {
				console.log("remove");
				dispatch(userActions.removeFav(data.place_id))
				const req = await axiosInstance.put('/user/deletefav', {
					place_id: data.place_id
				})
				console.log(req.data)
			} catch (err) {
				toast.error(err.response.data.message, {
					position: 'top-right'
				});
			}
		}
	}

	const showMoreHandler = (data) => {
		setData({
			place_name: data.name,
			place_id: data.place_id,
			coordinates: data.coordinates,
			categories: data.categories
		})

		setShowSidebar(true);
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
							<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "5px", marginTop: "5px" }}>
								{
									m.categories.map((x) => {
										return (
											<div style={{ padding: "6px", borderRadius: "10px", backgroundColor: "lightgreen", minHeight: "5px" }}>
												<p style={{ fontSize: "12px", margin: "0" }}>{x}</p>
											</div>
										)
									})
								}
							</div>
							<div style={{ display: "flex", flexDirection: "row", gap: "5px", marginTop: "10px" }}>
								<button
									style={{ padding: "5px", borderRadius: "10px", outline: "none", cursor: "pointer" }}
									onClick={() => showMoreHandler({ ...m })}
								>
									show more
								</button>
								<button style={{ padding: "5px", borderRadius: "10px", outline: "none", cursor: "pointer" }} onClick={() => handleFavorite({ ...m })}>{!checkfav(m.place_id) ? "Add to favorites" : "Added to favourites"}</button>
							</div>
						</div>
					</Popup>
				</Marker>
			);
		});
	}

	return (
		<>
			<Header />

			<div style={{ position: "relative" }}>
				{
					showAddFavorite
						?
						<AddADescription setShowAddFavorite={setShowAddFavorite} place_id={data.place_id} />
						:
						null
				}
				{
					showSidebar
						?
						<PlaceSidebar data={data} setShowSidebar={setShowSidebar} />
						:
						null
				}
				<Search_filter setmarkers={setmarkers} />
				<MapContainer center={markers[0].coordinates} zoom={13} scrollWheelZoom={true}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://tile.openstreetmap.de/{z}/{x}/{y}.png'
					/>
					<ChangeMapView coords={markers[0].coordinates} />
					<MultipleMarkers />
				</MapContainer>
			</div>
		</>
	)
}

export default MyMap;
