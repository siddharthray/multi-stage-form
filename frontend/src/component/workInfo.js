import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProfileData } from "../store/profile";

function WorkInfo() {

    const profile = useSelector((state) => state.profile.profile);

    const [input, setInput] = useState({});
    // const [isFilePicked, setIsFilePicked] = useState(false);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.name === "uploadedCv" || e.target.name === "uploadedCover") {
            if (e.target.name === "uploadedCv") {
                setInput({
                    [e.target.name]: e.target.files[0],
                    isFile: true,
                    available: { [e.target.name]: true },
                    isFieldDirty: { [e.target.name]: true }
                })
            } else {
                setInput({
                    [e.target.name]: e.target.files[0],
                    isFile: true,
                })
            }
        } else {
            if (e.target.value.trim() === '') {
                setInput({
                    [e.target.name]: e.target.value,
                    available: { [e.target.name]: false },
                    isFieldDirty: { [e.target.name]: true }
                })
            } else {
                if (e.target.name === 'location') {
                    setInput({
                        [e.target.name]: Boolean(e.target.value),
                        available: { [e.target.name]: true },
                        isFieldDirty: { [e.target.name]: true }
                    })
                    return;
                }
                setInput({
                    [e.target.name]: e.target.value,
                    available: { [e.target.name]: true },
                    isFieldDirty: { [e.target.name]: true }
                })
            }

        }

    }

    useEffect(() => {
        // update the object
        if (Object.keys(input).length > 1) {
            dispatch(addProfileData(input))
        }
    }, [input, dispatch]);

    return (
        <div className="other-info-container">
            <div>
                <label>Do you live in the US ?</label>
                <input className="location" type="radio" value={profile.location} name="location" onChange={handleChange} />
            </div>
            <input
                type="text"
                name="git"
                placeholder="Git..."
                className={profile.available.git || !profile.isFieldDirty.git ? 'inputField' : 'inputFieldErr'}
                value={profile.git}
                onChange={handleChange}
            />
            <input
                type="file"
                name="uploadedCv"
                placeholder="Upload CV..."
                className={profile.available.uploadedCv || !profile.isFieldDirty.uploadedCv ? 'inputField' : 'inputFieldErr'}
                onChange={handleChange}
            />
            <input
                type="file"
                name="uploadedCover"
                placeholder="Upload Cover..."
                onChange={handleChange}
            />
            <textarea
                type="text"
                name="about"
                rows="4" cols="24"
                placeholder="About You..."
                className={profile.available.about || !profile.isFieldDirty.about ? 'inputField' : 'inputFieldErr'}
                value={profile.about}
                onChange={handleChange}
            />
        </div>
    );
}

export default WorkInfo;