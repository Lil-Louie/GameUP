import Button from "./button";
import fieldImg from "../assets/field.jpg";


function Events( {data, onJoinedGame} ) {
  return (
    <section className="Card-Container border flex flex-wrap mx-5 mt-0.5 justify-center bg-gray-900 rounded-xl">
      
      {data.map((event) => (
          <section
              key={event.id}
              className="Event-Cards border m-5 w-100 rounded-xl bg-white shadow-md p-4"
          >
              <div className="Event-description text-sm">
                  <p className="mb-2 text-gray-800 font-bold text-xl text-center">{event.sport}</p>
                  <p className="mb-1 text-center text-gray-700">{event.time}</p>
                  <p className="ml-1"><strong>Location:</strong> {event.name}</p>
                  <p className="ml-1"><strong>Players:</strong> {event.playercount}/{event.size}</p>

                  <section className="flex justify-center mt-3">
                      <Button gameId={event.id} onJoined={onJoinedGame} />
                  </section>
              </div>
          </section>

      ))}

    </section>
  );
}

export default Events;
