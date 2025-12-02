import Button from "./button";
import fieldImg from "../assets/field.jpg";


function ProfileEvents( {data, onJoinedGame} ) {
    console.log("ProfileEvents first event:", data?.[0]);

    return (
    <section className="Card-Container border flex flex-wrap mx-5 mt-0.5 justify-center bg-gray-900 rounded-xl">

      {data.map((event) => (
        <section
          key={event.id}
          className="Event-Cards border m-5 w-100 h-122 rounded-xl bg-white "
        >
          <div className="Event-description text-sm ">
            <img src={fieldImg} className="h-70 w-100 rounded-md"/>
            <p className="m-5 text-gray-800 font-bold text-2xl text-center"> {event.sport}</p >
            <p className="ml-5 text-base">{event.time}</p>
            <p className="ml-5"><strong>Location:</strong> {event.name}</p>
            <p className="ml-5 pl-0"><strong>Players:</strong> {event.playercount}/{event.size}</p>
          </div>
        </section>
      ))}

    </section>
  );
}

export default ProfileEvents;
