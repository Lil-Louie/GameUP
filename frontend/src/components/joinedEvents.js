// src/components/joinedEvents.js
import LeaveButton from "./unjoin_button";

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

function JoinedEvents({ data, onReload }) {
    return (
        <section className="border flex flex-wrap mx-5 mt-0.5 justify-center bg-gray-900 rounded-xl">
            {data.map((event) => {
                const imgKey = event.sport.toLowerCase().replace(/\s+/g, "");
                const sportImg = sportImages[imgKey] || stock; // fallback to stock

                return (
                    <section
                        key={event.id}
                        className="border m-5 w-100 rounded-xl bg-white shadow-md p-4"
                    >
                        <div className="text-sm text-gray-900">
                            <img
                                src={sportImg}
                                alt={event.sport}
                                className="w-full h-40 object-cover rounded-md mb-3"
                            />

                            <p className="mb-2 font-bold text-xl text-center">
                                {event.sport}
                            </p>
                            <p className="mb-1 text-center">{event.time}</p>
                            <p className="ml-1">
                                <strong>Location:</strong> {event.name}
                            </p>
                            <p className="ml-1">
                                <strong>Players:</strong> {event.playercount}/{event.size}
                            </p>

                            <div className="flex justify-center mt-3">
                                <LeaveButton gameId={event.id} onLeft={onReload} />
                            </div>
                        </div>
                    </section>
                );
            })}
        </section>
    );
}

export default JoinedEvents;
