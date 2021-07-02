/* global chrome */

import "./Generate.css";
import { Alert, Button } from "react-bootstrap";
import {useState,useEffect} from "react";
import { numbers,upperCaseLetters,lowerCaseLetters,specialCharacters} from './Characters';

const Generate = () => {
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
        console.log(password);
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

        // const queryInfo = {active: true, lastFocusedWindow: true};

        // chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        //     const url = tabs[0].url;
        //     setUrl(url);
        // });


      }

    useEffect(() => {
    const queryInfo = {active: true, lastFocusedWindow: true};

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        const url = tabs[0].url.hostname;
        setUrl(url);
    });
}, []);

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

      window.onload = async ()=>{
          await handleGeneratePasword();
      }


    return (
        <>
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
            <h6>{url}</h6>               
        </div>
        <br />
        <h5>Copyright &copy; Abdul Wahab </h5>
        </>
    );
}


    {/* <div className="websites">
      <Avatar className="avatar" round="50px" size="50" name="Canvas" />
        <h5 className="hostname">Password : RGY§x'EyjPMe0,</h5>
        <a  href="#" className="domain" >www.ashesi.instructure.com</a>
        <a style={{fontSize:"14px"}} href="#"  className="link" >Copy</a>
    </div>
    <br /> */}
 
export default Generate;