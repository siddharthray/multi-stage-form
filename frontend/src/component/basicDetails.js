import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProfileData } from "../store/profile";

function BasicInfo() {

    // const loading = useSelector((state) => state.todo.loading);
    // const error = useSelector((state) => state.todo.error);
    const profile = useSelector((state) => state.profile.profile);
    const [firstNameTouced, setFirstNameTouch] = useState(false);
    const [emailTouced, setemailTouced] = useState(false);
    const [input, setInput] = useState({});

    const dispatch = useDispatch();
    const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.name === 'firstName' || e.target.name === 'email') {
            if (e.target.name === 'email') {
                if (validEmailRegex.test(e.target.value)) {
                    setInput({
                        [e.target.name]: e.target.value.trim(),
                        available: { [e.target.name]: true },
                        isFieldDirty: { email: true }
                    })
                } else {
                    setInput({
                        [e.target.name]: e.target.value.trim(),
                        available: { [e.target.name]: false },
                        isFieldDirty: { email: true }
                    })
                }
                return;
            }
            if (e.target.value.trim() === '') {
                setInput({
                    [e.target.name]: e.target.value.trim(),
                    available: { [e.target.name]: false },
                    isFieldDirty: { firstName: true }
                })
            } else {
                setInput({
                    [e.target.name]: e.target.value.trim(),
                    available: { [e.target.name]: true },
                    isFieldDirty: { firstName: true }
                })
            }
            return;

        }
        setInput({ [e.target.name]: e.target.value, ...{ available: {} } })
    }

    useEffect(() => {
        // update the object
        if (Object.keys(input).length > 1) {
            dispatch(addProfileData(input))
        }
    }, [input, dispatch]);
    return (
        <div className="personal-info-container">
            <input
                type="text"
                name="firstName"
                placeholder="First Name..."
                value={profile.firstName}
                className={profile.available.firstName || !profile.isFieldDirty.firstName ? 'inputField' : 'inputFieldErr'}
                onChange={handleChange}
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name..."
                className="inputField"
                value={profile.lastName}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email..."
                value={profile.email}
                className={profile.available.email || !profile.isFieldDirty.email ? 'inputField' : 'inputFieldErr'}
                onChange={handleChange}
            />
            <input
                type="tel"
                name="phone"
                className="inputField"
                placeholder="Phone..."
                value={profile.phone}
                onChange={handleChange}
            />
        </div>


    );
}

export default BasicInfo;
