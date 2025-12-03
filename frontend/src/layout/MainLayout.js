import { useState } from "react";
import Header from "../components/Header";
import Login from "../components/Login";
import CreateAccount from "../components/CreateAccount";

function MainLayout({ children }) {
    const [showLogin, setShowLogin] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    return (
        <>
            {/* Navbar */}
            <Header onLogin={() => setShowLogin(true)} />

            {/* Page content */}
            <main className="">
                {children}
            </main>

            {/* Login Modal */}
            {showLogin && (
                <Login
                    onClose={() => setShowLogin(false)}
                    switchToCreate={() => {
                        setShowLogin(false);
                        setShowCreate(true);
                    }}
                    onLoginSuccess={() => setShowLogin(false)}  // 👈 add this
                />
            )}

            {/* Create Account Modal */}
            {showCreate && (
                <CreateAccount
                    onClose={() => setShowCreate(false)}
                    switchToLogin={() => {
                        setShowCreate(false);
                        setShowLogin(true);
                    }}
                />
            )}
        </>
    );
}

export default MainLayout;
