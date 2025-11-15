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
            <p><strong>Sport:</strong> {event.sport}</p>
            <p><strong>Address:</strong> {event.address}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Players:</strong> {event.players_id.length}</p>
            {event.size && (
              <p><strong>Size:</strong> {event.size}</p>
            )}
            <p>
              <strong>Status:</strong>{" "}
              <span className={event.status ? "text-green-600" : "text-red-600"}>
                {event.status ? "Ready" : "Open"}
              </span>
            </p>
          </div>
        </section>
      ))}

    </section>
  );
}

export default Events;
