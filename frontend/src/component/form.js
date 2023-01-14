import React, { useState } from "react";
import BasicInfo from "./basicDetails";
import WorkInfo from "./workInfo";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./notification";
import { addProfile, resetStore } from "../store/profile";


function Form() {
    const [page, setPage] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const profile = useSelector((state) => state.profile.profile);
    const loading = useSelector((state) => state.profile.loading);
    const dispatch = useDispatch();

    const FormTitles = ["Basic Details", "Professional Details"];

    const validations = () => {
        if (page === 0) {
            if (!profile.available.firstName || !profile.available.email) {
                return;
            }
            setPage((currPage) => currPage + 1);
        }
        if (page === 1) {
            if (!profile.available.git
                || !profile.available.uploadedCv
                || !profile.available.about) {
                alert("Please fill the required details")
                return;
            }
            console.log("profile data ", profile)
            dispatch(
                addProfile(profile)
            );
            setSubmitted(true)
            setPage((currPage) => currPage + 1);
            dispatch(resetStore())
        }
    }

    const PageDisplay = () => {
        if (page === 0) {
            return <BasicInfo />;
        } else if (page === 1) {
            return <WorkInfo />;
        } else {
            return <Notification />
        }
    };

    const formSubmitted = () => {
        if (page === 2) {
            return (
                <div className="footer" >
                    <button onClick={() => {
                        setPage(0)
                        setSubmitted(false)
                    }}>
                        Home</button>
                </div>
            )

        }
    }

    return (
        <div className="form">
            <div className="progressbar">
                <div
                    style={{ width: page === 0 ? "50%" : "100%" }}
                ></div>
            </div>
            <div className="form-container">
                <div className="header">
                    <h1>{FormTitles[page]}</h1>
                </div>
                <div className="body">{PageDisplay()}</div>
                {submitted ? formSubmitted() :
                    <div className="footer">
                        <button
                            disabled={page === 0}
                            onClick={() => {
                                setPage((currPage) => currPage - 1);
                            }}
                        >
                            Prev
                        </button>
                        <button
                            onClick={() => {
                                validations()
                            }}
                        >
                            {page === FormTitles.length - 1 ? "Submit" : "Next"}
                        </button>
                    </div>
                }

            </div>
        </div>
    );
}

export default Form;
