// src/components/profileEvents.js
import fieldImg from "../assets/field.jpg";

import basketball from "../assets/basketball.jpg";
import bowling from "../assets/bowling.jpg";
import cod from "../assets/cod.jpeg";
import cornhole from "../assets/cornhole.jpg";
import pingpong from "../assets/pingpong.jpeg";
import snowboarding from "../assets/snowboarding.jpg";
import soccer from "../assets/soccer.jpg";
import tennis from "../assets/tennis.jpg";
import waterpolo from "../assets/waterpolo.jpeg";
import baseball from "../assets/baseball.webp";
import stock from "../assets/stock.jpg";

// image lookup table
const sportImages = {
    baseball,
    basketball,
    bowling,
    cod,
    cornhole,
    pingpong,
    snowboarding,
    soccer,
    tennis,
    waterpolo,
};

function ProfileEvents({ data }) {
    console.log("ProfileEvents first event:", data?.[0]);

    return (
        <section className="Card-Container border flex flex-wrap mx-5 mt-0.5 justify-center bg-gray-900 rounded-xl">
            {data.map((event) => {
                const imgKey = event.sport.toLowerCase().replace(/\s+/g, "");
                const sportImg = sportImages[imgKey] || stock; // fallback to stock

                return (
                    <section
                        key={event.id}
                        className="Event-Cards border m-5 w-100 h-122 rounded-xl bg-white"
                    >
                        <div className="Event-description text-sm">
                            <img
                                src={sportImg}
                                alt={event.sport}
                                className="h-40 w-full object-cover rounded-md"
                            />
                            <p className="m-5 text-gray-800 font-bold text-2xl text-center">
                                {event.sport}
                            </p>
                            <p className="ml-5 text-base">{event.time}</p>
                            <p className="ml-5">
                                <strong>Location:</strong> {event.name}
                            </p>
                            <p className="ml-5 pl-0">
                                <strong>Players:</strong> {event.playercount}/{event.size}
                            </p>
                        </div>
                    </section>
                );
            })}
        </section>
    );
}

export default ProfileEvents;
