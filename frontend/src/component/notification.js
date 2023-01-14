import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProfileData } from "../store/profile";

function Notification() {

    return (
        <div className="personal-info-container">
            <p className="submitted">Submitted Successfully</p>
        </div>


    );
}

export default Notification;
