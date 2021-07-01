import "./Home.css";
import Generate from "./Generate";


const Home = () => {
     
    return (
        <>
		<div className="tab_container">
			<input className="tabs" id="tab1" type="radio" name="tabs" checked />
			<label className="label-tabs" id="tab1" for="tab1"><i className="fa fa-random"></i><span>Generate</span></label>

			<input className="tabs" id="tab2" type="radio" name="tabs" />
			<label className="label-tabs" id="tab2" for="tab2"><i className="fa fa-globe"></i><span>Websites</span></label>

			<section id="content1" className="tab-content">
				<Generate />

			</section>

			<section id="content2" className="tab-content">
				<h3>Tab 2</h3>
		      	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		      	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		      	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
		     
			</section>

         

			
		</div>


</>
    );
}
 
export default Home;