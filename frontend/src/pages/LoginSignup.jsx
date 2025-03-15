import React, { useState } from 'react' 
import './CSS/loginsignup.css'

const LoginSignup = ()=>{
    const [state , setstate] = useState("Login");
    const [formData , setformData] = useState({
        name:"",
        email: "",
        password: "",
    });

    const login = async () => {
        console.log("Log in", formData);
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            

            const resData = await response.json();
    
            if (resData.success) {
                localStorage.setItem('auth-token', resData.token);
                window.location.replace("/");
            } 
            else{
                alert("error")
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    const SignUp = async () => {
        console.log("SignUp", formData);
        
        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            

            const resData = await response.json();
    
            if (resData.success) {
                localStorage.setItem('auth-token', resData.token);
                window.location.replace("/");
            } 
            else{
                alert("error the acc in found")
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    const changeHandler=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value});
    }
    return(
        <div className='loginsignup'>
            <div className="loginsignupcontainer">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up"?<input value={formData.name} onChange={changeHandler} name='name' type="text" placeholder='Your Name'/>:<></>}
                    <input type="email"value={formData.email} onChange={changeHandler} name='email' placeholder='Email Address' />
                    <input type="password" value={formData.password} onChange={changeHandler} name='password' placeholder='Password'/>
                </div>
                <button onClick={()=>{
                    state==="Login"?login():SignUp()
                }}>Continue</button>
                {state==="Sign Up"?
                <p className="loginsignup-login">Already have an account? <span onClick={()=>{
                    setstate("Login")
                }}>Login</span></p>:
                <p className="loginsignup-login">Create an account? <span onClick={()=>{
                    setstate("Sign Up")
                }}>Click here</span></p>}
                <div className="loginsignup-agree">
                    <input type="checkbox"/>
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>
    )
}
export default LoginSignup;