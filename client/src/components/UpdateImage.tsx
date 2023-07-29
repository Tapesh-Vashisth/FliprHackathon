import React, {useState, useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import convertToBase64 from '../helper/ConvertToBase64';
import axiosInstance from "../api/axiosInstance";
import { userActions } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfileImageUpdate = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    const [image, setImage] = useState<any>(user.image ? user.image : null);
    const [change, setChange] = useState<boolean>(false);
    const [showSave, setShowSave] = useState(false);
    const dispatch = useAppDispatch();

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg") {
                let base64 = await convertToBase64(file);
                setShowSave(true);
                setImage(base64);
                setChange(true);
            } else {
                toast.error("Allowed formats are - jpeg, png & jpg", {
                    position: "top-right"
                })
            }
        }
    }

    const updateImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setChange(false);
        try{
            await axiosInstance.post("/user/updateimage", {image, email: user.email});
            dispatch(userActions.setImage(image));
            setChange(false);
            setShowSave(false);
            toast.success("Profile Image Saved Successfully!", {
                position: "top-right"
            })
        } catch (err: any) {
            console.log(err);
            if (err.message === "Network Error"){ 
                toast.error("Network Error", {
                    position: "top-right",
                });
            } else {
                toast.error(err.response.data, {
                    position: "top-right",
                });
            }
            setChange(true);
        }
    }

    return (
        <div className='update-image'>
            <label className='update-image__label' htmlFor='proimage'>
                <input type = "file" id = "proimage" hidden onChange={handleImage} />
                {
                    image 
                    ?
                    <img src={image} alt = "" className='update-image__image' />
                    :
                    <div className='update-image__image-icon'>{user.name[0].toUpperCase()}</div>
                }
            </label>
            {
                showSave
                ?
                <button className='button-secondary' id = "probtn" onClick = {updateImage} disabled = {change ? false: true}>Save</button>
                : 
                null
            }
        </div>
    )
}

export default ProfileImageUpdate