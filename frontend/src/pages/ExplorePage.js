import Header from '../components/Header';
import Filter from '../components/Filter';
import Events from "../components/Events";


function ExplorePage() {
    return (
        
      <div className="Explore-Page">
        <Header />
        <div className='Explore-Page-Container flex min-h-screen'>
        <Filter />
        <Events />

        </div>
      </div>

    );
  }
  
  export default ExplorePage;

