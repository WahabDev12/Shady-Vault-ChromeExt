/* global chrome */

import './App.css';
import "./Home.css";
import "./Generate.css";
import { Alert, Button } from "react-bootstrap";
import {useState} from "react";
import { numbers,upperCaseLetters,lowerCaseLetters,specialCharacters} from './Characters';
import axios from "axios";


function App() {
  const [password,setPassword] = useState("");  
  const [passwordLength,setPasswordLength] = useState(15);
  const [includeUpppercase,setIncludeUppercase] = useState(true);
  const [includeLowercase,setIncludeLowercase] = useState(true);
  const [includeNumbers,setIncludeNumbers] = useState(true);
  const [includeSymbols,setIncludeSymbols] = useState(true);
  const [error,setError] = useState("");
  let [alert,setAlert] = useState("");
  let [noField,setNoField] = useState("");
  const [url,setUrl] = useState("");
  const [email,setEmail] = useState("");


  var options = {
    method: 'GET',
    url: 'https://easy-fast-temp-mail.p.rapidapi.com/create',
    params: {address: 'random', ttl: '3600', public: 'true'},
    headers: {
      'x-rapidapi-key': 'd18b5b0c67msh87889490014b135p1add7bjsn6b9c4d5f273c',
      'x-rapidapi-host': 'easy-fast-temp-mail.p.rapidapi.com',
      'Access-Control-Allow-Origin': '*'

    }
  };

const handleEmailGenerate = (e)=>{
  e.preventDefault();
  axios.request(options).then((response) => {
    console.log(response.data.address);
    const email = response.data.address;
    return setEmail(email)
  }).catch((error)=> {
    console.error(error.message);
  });
  
}

  // Handle Generate Password

  const handleGeneratePasword = () =>{
      if(!includeSymbols && !includeUpppercase && !includeLowercase && !includeNumbers){
          noField = "Please select an input"
          setNoField(noField);
      }
      let characterList = "";
      if(includeUpppercase){
          characterList = characterList + upperCaseLetters;
      }
      if(includeLowercase){
          characterList = characterList + lowerCaseLetters;
      }
      if(includeNumbers){
          characterList = characterList + numbers;
      }
      if(includeSymbols){
          characterList = characterList + specialCharacters;
      }

      setPassword(createPassword(characterList));
      setAlert("");
      setNoField("");
      setError("");
  }
  const createPassword = (characterList)=>{
      let password = "";
      const characterListLength = characterList.length;
      for(let i = 0; i < passwordLength;i++){
          const characterIndex = Math.round(Math.random() * characterListLength);
          password = password + characterList.charAt(characterIndex);
      }
      try{
          return password;

      }
      catch(error){
          setError(error)
      }
      console.log(password);
      return password;

  }

  const copyToClipboard = () => {
      const newTextArea = document.createElement('textarea')
      newTextArea.innerText = password
      document.body.appendChild(newTextArea)
      newTextArea.select()
      document.execCommand('copy')
      newTextArea.remove();

      // Get current tab URL

      const queryInfo = {active: true, lastFocusedWindow: true};

      chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
          const url = tabs[0].url;
          setUrl(url);

      });


    }

    const copyToClipEmail = () => {
      const newTextArea = document.createElement('textarea')
      newTextArea.innerText = email
      document.body.appendChild(newTextArea)
      newTextArea.select()
      document.execCommand('copy')
      newTextArea.remove();

    }

  const handleCopyPassword = (e) => {
      if (password === '') {
          
          console.log("There was an error");
      } else {
        copyToClipboard();
        console.log(url)
        try{
          alert = "Password copied";
          setAlert(alert)
          console.log("Password copied succesfully");

        }
        catch(error){
            setError(error)
        }
      }
    }


  const handleCopyEmail = () =>{
    if (email === '') {
          
      console.log("There was an error");
  } else {
    copyToClipEmail();
    console.log(url)
    try{
      alert = "email copied";
      setAlert(alert)
      console.log("email copied succesfully");

    }
    catch(error){
        setError(error)
    }
  }
}
  

    window.onload = async ()=>{
        await handleGeneratePasword();
    }
  return (

    <>

    <div className="App">
		<div className="tab_container">
			<input className="tabs" id="tab1" type="radio" name="tabs" checked />
			<label className="label-tabs" id="tab1" for="tab1"><i className="fa fa-random"></i><span>Generate</span></label>

			<input className="tabs" id="tab2" type="radio" name="tabs" />
			<label className="label-tabs" id="tab2" for="tab2"><i className="fa fa-globe"></i><span>Emails</span></label>

			<section id="content1" className="tab-content">
				{/* <Generate /> */}
        <div className="generate">
            <div className="result-gen">
            <h1 className="password">{password}</h1>
            <button onClick={handleGeneratePasword} className="gen"><i className="fa fa-refresh"></i></button >

            </div>
            <Button onClick={handleCopyPassword} className="copy" variant="success">Copy</Button>
            {error && <Alert style={{fontSize:"20px"}}>Failed to copy</Alert>}
            {alert && <Alert style={{fontSize:"20px"}}>Copied to Clipboard</Alert>}
            {noField && <Alert style={{fontSize:"20px"}}>Please select an input field</Alert>}
            <div style={{height:"70px"}}></div>
            <div className="line"></div>
            <div className="settings">
            <div className="setting">
            <label className="p-length">Password length : </label>
			<input className="num" type="number" id="length" min='4' max='15' onChange={(e) => setPasswordLength(e.target.value)} defaultValue={passwordLength} />
            </div>

            <div className="setting">
			<label className="include">Include uppercase letters (A-Z)</label> 
			<input onChange={(e) => setIncludeUppercase(e.target.checked)} type="checkbox" id="uppercase" checked={includeUpppercase} />
		</div>
		<div className="setting">
			<label className="include" >Include lowercase letters (a-z)</label> 
			<input onChange={(e) => setIncludeLowercase(e.target.checked)} type="checkbox" id="lowercase" checked={includeLowercase} />
		</div>
		<div className="setting">
			<label className="include" >Numbers (0-9)</label> 
			<input onChange={(e) => setIncludeNumbers(e.target.checked)} type="checkbox" id="numbers" checked={includeNumbers} />
		</div>
		<div className="setting">
			<label  className="include" >Include symbols</label> 
			<input onChange={(e) => setIncludeSymbols(e.target.checked)} type="checkbox" id="symbols" checked={includeSymbols}   />
		</div>
            </div>
          
        </div>
        <br />
        <h5>Copyright &copy; Abdul Wahab </h5>

			</section>

			<section id="content2" className="tab-content">
    <br />
    <div className="generate">
            <div className="result-gen">
            <h5>Click to Generate an Email</h5>
            <h6 style={{fontSize:"20px"}} className="password">{email}</h6>
            <button onClick={handleEmailGenerate} className="gen"><i className="fa fa-refresh"></i></button>

            </div>
            <Button onClick={handleCopyEmail} className="copy" variant="success">Copy</Button>
            {error && <Alert style={{fontSize:"20px"}}>Failed to copy</Alert>}
            {alert && <Alert style={{fontSize:"20px"}}>Copied to Clipboard</Alert>}
    </div>
  
	</section>

         

			
		</div>
      
    </div>
    </>
  );

}

export default App;
