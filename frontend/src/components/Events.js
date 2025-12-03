import Button from "./button";
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
    stock,
    tennis,
    waterpolo,
};

function Events({ data, onJoinedGame }) {
    return (
        <section className="Card-Container border flex flex-wrap mx-5 mt-0.5 justify-center bg-gray-900 rounded-xl">

            {data.map((event) => {
                // convert sport name to lowercase & remove spaces
                const imgKey = event.sport.toLowerCase().replace(/\s+/g, "");
                const sportImg = sportImages[imgKey] || stock;

                return (
                    <section
                        key={event.id}
                        className="Event-Cards border m-5 rounded-xl bg-white shadow-md p-3"
                        style={{ width: "300px" }}   // small card width
                    >
                        <div className="Event-description text-xs">
                            {/* HARD-SIZED SMALL IMAGE */}
                            <img
                                src={sportImg}
                                alt={event.sport}
                                style={{
                                    width: "360px",
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    display: "block",
                                    margin: "0 auto",
                                }}
                            />

                            <p className="mt-2 text-gray-800 font-bold text-center text-sm">
                                {event.sport}
                            </p>

                            <p className="text-center text-xs">{event.time}</p>
                            <p className="text-xs">
                                <strong>Location:</strong> {event.name}
                            </p>
                            <p className="text-xs">
                                <strong>Players:</strong> {event.playercount}/{event.size}
                            </p>

                            <section className="flex justify-center mt-2">
                                <Button gameId={event.id} onJoined={onJoinedGame} />
                            </section>
                        </div>
                    </section>
                );
            })}

        </section>
    );
}

export default Events;
