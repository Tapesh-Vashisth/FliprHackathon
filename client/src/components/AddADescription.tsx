import React, {useEffect, useState} from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { userActions } from '../features/userSlice';
import axiosInstance from "../api/axiosInstance";
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';


function AddADescription(props: any) {
    const [desc, setDesc] = useState("");
	const state = useAppSelector((user) => user.user);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const checkfav = (place_id: any) => {
		let favs = state.favs
		for (let i=0; i<favs.length; i++) {
			console.log("favs", favs[i]);
			if (favs[i].place === place_id) return true
		}
		return false
	}

    useEffect(() => {
        console.log(props);
    }, []);

    const submitHandler = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        console.log(desc, props.place_id);

        try {
            if (!checkfav(props.place_id)) {
                dispatch(userActions.addFav({id: props.place_id, description: desc}))
                const req = await axiosInstance.put('/user/addfav', {
                    place_id: props.place_id,
                    description: desc
                })
                console.log(req.data)
            }
            else {
                dispatch(userActions.removeFav(props.place_id))
                const req = await axiosInstance.put('/user/deletefav', {
                    place_id: props.place_id
                })
                console.log(req.data)
            }

            setLoading(false);
        } catch (err: any) {
            toast.error(err.response.data.message,{
                position: 'top-right'
            });
            setLoading(false);
        }
        props.setShowAddFavorite(false);
    }


    return (
        <form onSubmit={submitHandler} style = {{zIndex: 1006, position: "absolute", top: "50%", left: "50%", backgroundColor: "lightgreen", padding: "15px", transform: "translate(-50%, -50%)", width: "270px", borderRadius: "10px"}}>
            <div style = {{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                <CloseIcon onClick = {() => props.setShowAddFavorite(false)} style = {{fontSize: "20px"}} />
            </div>
            <div>
                <p style = {{fontSize: "16px", marginBottom: "10px"}}>Add A Small Description</p>
                <textarea style = {{padding: "5px", maxWidth: "100%", width: "100%"}} rows={3} value={desc} onChange = {(e: any) => setDesc(e.target.value)}>

                </textarea>
            </div>
            <div style = {{textAlign: "center", marginTop: "10px"}}>
                <button style = {{padding: "5px"}}>
                    {loading ? (
                        <CircularProgress size={"1.5rem"} />
                    ) : (
                        "Add to Favorites"
                    )}   
                </button>
            </div>
        </form>
    )
}

export default AddADescription