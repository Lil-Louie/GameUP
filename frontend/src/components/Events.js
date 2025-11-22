import Button from "./button";


function Events( {data} ) {
  return (
    <section className="Card-Container border flex flex-wrap ml-5 mt-0.5 justify-center">
      
      {data.map((event) => (
        <section 
          key={event.id} 
          className="Event-Cards border m-5 w-64 rounded-lg shadow-2xl "
        >


          <div className="Event-description text-sm text-center ">
            <p className=" m-5 text-gray-800 font-bold text-2xl"> {event.sport}</p >
            <p className="text-base m-5  mb-0">{event.time} @ {event.name}</p>
            <p className="ml-5"><strong>Players:</strong> {event.players_id.length}/{event.size}</p>
            <Button />
          </div>
        </section>
      ))}

    </section>
  );
}

export default Events;
