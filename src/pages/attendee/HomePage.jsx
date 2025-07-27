import React from "react";
import AttendeeNavBar from "../../components/AttendeeNavBar";
import GuestNavBar from "../../components/GuestNavBar";
import { useSelector } from "react-redux";

function Home() {
    const currentUser = useSelector((state) => state.auth.currentUser);

    return (
        <>
        {currentUser ? <AttendeeNavBar /> : <GuestNavBar />}
        </>
    );
};

export default Home;

