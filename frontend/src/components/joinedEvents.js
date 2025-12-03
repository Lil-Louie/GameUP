// src/components/joinedEvents.js
import LeaveButton from "./unjoin_button";

function JoinedEvents({ data, onReload }) {
    return (
        <section className="border flex flex-wrap mx-5 mt-0.5 justify-center bg-gray-900 rounded-xl">
            {data.map((event) => (
                <section
                    key={event.id}
                    className="border m-5 w-100 rounded-xl bg-white shadow-md p-4"
                >
                    <div className="text-sm text-gray-900">
                        <p className="mb-2 font-bold text-xl text-center">{event.sport}</p>
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
            ))}
        </section>
    );
}

export default JoinedEvents;
