import React from "react";
import AttendeeNavBar from "../components/AttendeeNavBar";
import GuestNavBar from "../components/GuestNavBar";
import { useSelector } from "react-redux";

function Events() {
    const currentUser = useSelector((state) => state.auth.currentUser);

    return (
        <>
        {currentUser ? <AttendeeNavBar /> : <GuestNavBar />}
        </>
    );
};

export default Events;