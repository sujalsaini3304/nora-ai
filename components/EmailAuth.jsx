import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.connection.js";
import { sendEmailVerification, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "@mui/material";

const EmailVerification = () => {
    const [user, setUser] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            navigate("/signin");
        } else if (currentUser.emailVerified) {
            navigate("/");
        } else {
            setUser(currentUser);
        }
    }, [navigate]);

    const handleSendVerification = async () => {
        try {
            await sendEmailVerification(user);
            setSuccess("Verification email sent! Check your inbox.");
            setTimeout(() => setSuccess(""), 5000);
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(""), 5000);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/signin");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white w-[400px] shadow-xl rounded-3xl p-10 border border-gray-100 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-500 tracking-wide">
                    Verify Your Email
                </h2>
                <p className="text-gray-500 mt-2 text-sm">
                    Please verify your email to continue. Check your inbox for the verification link.
                </p>

                {success && <Alert severity="success" className="mt-4">{success}</Alert>}
                {error && <Alert severity="error" className="mt-4">{error}</Alert>}

                <div className="mt-6 flex flex-col gap-4">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSendVerification}
                        fullWidth
                    >
                        Resend Verification Email
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleLogout}
                        fullWidth
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
