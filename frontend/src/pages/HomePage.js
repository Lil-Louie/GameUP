import { useState } from "react";
import Header from '../components/Header'
import Login from "../components/Login";


function HomePage() {
  const [openLogin, setOpenLogin] = useState(false);


  return (
    <div>
      <div>
        <Header onLogin={() => setOpenLogin(true)} />

        {openLogin && (
          <Login onClose={() => setOpenLogin(false)} />
        )}
      </div>

      <h1 className="flex justify-center text-3xl font-bold underline">
          Hello, welcome to GameUP!
      </h1>

    </div>
  );
}

export default HomePage;