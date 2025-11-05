import Header from '../components/Header';

function ExplorePage() {
    return (
        
      <div className="Explore-Page">
        <Header />

        <section id='Explore_Page'>
            <div className="rightNav">
                <input type="text" name="search" id="search" placeholder="Search"/>
                <button className="btn btn-sm">Search</button>
            </div>
        </section>
      </div>

    );
  }
  
  export default ExplorePage;

