// FakeData.js

const Events = [
    {
        id: 1,
        name: "Golis Park",
        address: "2561 Golis Dr, Rohnert Park, CA 94928",
        url: "https://images.unsplash.com/photo-1562518159-34b88e0ec71b?auto=format&fit=crop&w=900&q=60",
        time: "2025-02-25 15:00:00",
        players_id: [1, 3, 5],
        size: 5,               
        status: false,          
        sport: "Basketball"
      },
      
      {
        id: 2,
        name: "Magnolia Park",
        address: "Rohnert Park Expressway & Magnolia Ave, Rohnert Park, CA 94928",
        url: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=900&q=60",
        time: "2025-02-25 17:30:00",
        players_id: [2, 4],
        size: 10,               
        status: false,          
        sport: "Soccer"
      },
      
      {
        id: 3,
        name: "Dorotea Park",
        address: "801 Dorotea Cir, Rohnert Park, CA 94928",
        url: "https://images.unsplash.com/photo-1542317854-a43df4a9b6d9?auto=format&fit=crop&w=900&q=60",
        time: "2025-02-26 10:00:00",
        players_id: [7, 9, 10, 11],
        size: 4,                
        status: true,           
        sport: "Tennis"
      },
      
      {
        id: 4,
        name: "Eagle Park",
        address: "3310 Country Club Dr, Rohnert Park, CA 94928",
        url: "https://images.unsplash.com/photo-1520962918287-7448c2878f65?auto=format&fit=crop&w=900&q=60",
        time: "2025-02-27 14:00:00",
        players_id: [1, 8],
        size: 6,                 
        status: false,           
        sport: "Volleyball"
      },
      
      {
        id: 5,
        name: "Caterpillar Park",
        address: " ",
        url: "https://images.unsplash.com/photo-1526413232641-04c2a9c59e95?auto=format&fit=crop&w=900&q=60",
        time: "2025-02-28 18:15:00",
        players_id: [6],
        size: 2,                  
        status: false,           
        sport: "Pickleball"
      },
      
      {
        id: 6,
        name: "Peacock Park",
        address: "2559 Baywood Dr, Rohnert Park, CA 94928",
        url: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=900&q=60",
        time: "2025-03-02 09:00:00",
        players_id: [3, 12, 14],
        size: 11,                 
        status: false,            
        sport: "Football"
      },

    {
        id: 7,
        name: "Golis Park",
        address: "2561 Golis Dr, Rohnert Park, CA 94928",
        url: "https://images.unsplash.com/photo-1500485035595-cbe6ef8a1f5c?auto=format&fit=crop&w=900&q=60",
        time: "2025-03-03 16:00:00",
        players_id: [2, 9],
        size: 4,
        status: false,
        sport: "Frisbee"
      },
    
      {
        id: 8,
        name: "Magnolia Park",
        address: "Rohnert Park Expressway & Magnolia Ave, Rohnert Park, CA 94928",
        url: "https://images.unsplash.com/photo-1584735174298-2411bd0d2d7b?auto=format&fit=crop&w=900&q=60",
        time: "2025-03-04 13:30:00",
        players_id: [1, 3, 7],
        size: 3,
        status: true,  
        sport: "Spikeball"
      },
    
      {
        id: 9,
        name: "Dorotea Park",
        address: "801 Dorotea Cir, Rohnert Park, CA 94928",
        url: "https://images.unsplash.com/photo-1554344055-6518ab57f17d?auto=format&fit=crop&w=900&q=60",
        time: "2025-03-04 18:00:00",
        players_id: [5],
        size: 4,
        status: false,
        sport: "Badminton"
      },
    
      {
        id: 10,
        name: "Eagle Park",
        address: "3310 Country Club Dr, Rohnert Park, CA 94928",
        url: "https://images.unsplash.com/photo-1515165562835-c4c6e1e7df19?auto=format&fit=crop&w=900&q=60",
        time: "2025-03-05 08:30:00",
        players_id: [3, 6, 8],
        size: 5,
        status: false,
        sport: "Softball"
      },
    
      {
        id: 11,
        name: "Caterpillar Park",
        address: "Bluebell Dr & Buttercup Cir, Rohnert Park, CA 94928",
        url: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=900&q=60",
        time: "2025-03-06 12:00:00",
        players_id: [10, 11],
        size: 2,
        status: true,   
        sport: "Handball"
      },
    
      {
        id: 12,
        name: "Peacock Park",
        address: "2559 Baywood Dr, Rohnert Park, CA 94928",
        url: "https://images.unsplash.com/photo-1541329164087-028a2f7f7ff8?auto=format&fit=crop&w=900&q=60",
        time: "2025-03-07 19:00:00",
        players_id: [4, 7, 12],
        size: 6,
        status: false,
        sport: "Ultimate Frisbee"
      }
  ];

  const Players = [
    { id: 1,  name: "Shelby Anderson" },
    { id: 2,  name: "Sean Bellingheri" },
    { id: 3,  name: "Meaghan Boykin" },
    { id: 4,  name: "Raymond Cromwell" },
    { id: 5,  name: "Gregory Demo" },
    { id: 6,  name: "Max Edwards" },
    { id: 7,  name: "Ethan Escalante" },
    { id: 8,  name: "Nicholas Frangione" },
    { id: 9,  name: "Luis Galvez Diaz" },
    { id: 10, name: "Andrew Garberolio" },
    { id: 11, name: "Kyle Garrity" },
    { id: 12, name: "Avery Linn" },
    { id: 13, name: "Irving Lopez" },
    { id: 14, name: "Nathan Mailloux" },
    { id: 15, name: "Broderick Noyes" },
    { id: 16, name: "Emilio Orozco" },
    { id: 17, name: "Nolan Steinhart" },
    { id: 18, name: "Christopher Tziu Aban" },
    { id: 19, name: "Cristian Villalobos" },
    { id: 20, name: "Luke Weidner" },
    { id: 21, name: "Caroline Zeliger" }
  ];
  
  export default Events;
  