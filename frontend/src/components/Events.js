import Button from "./button";


function Events( {data} ) {
  return (
    <section className="Card-Container border flex flex-wrap ml-5 mt-0.5 justify-center">
      
      {data.map((event) => (
        <section 
          key={event.id} 
          className="Event-Cards border m-5 w-64 rounded-lg shadow-2xl "
        >

          <img 
            src={event.url} 
            alt={event.name} 
            className="rounded-md  w-full h-32 object-cover"
          />

          <div className="Event-description text-sm">
            <p className=" m-5 text-gray-600 "> {event.sport}</p >
            <p className="text-base">{event.time} @ {event.name}</p>
            <p><strong>Players:</strong> {event.players_id.length}/{event.size}</p>
            <Button />
          </div>
        </section>
      ))}

    </section>
  );
}

export default Events;
