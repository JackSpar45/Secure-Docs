import React, {useState, useRef} from 'react'
import Features from './Features'
import Modal from 'react-modal'
import ReCAPTCHA from "react-google-recaptcha"
import axios from 'axios'
import Dashboard from './Dashboard'

function HomePage() {
  
  // Handling Registration Modal------------------>
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);
  
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const handleRegistration = async (e) => {
    e.preventDefault();
    if(password != confirmPassword){
      alert("Passwords do not match.");
      return;
    }

    try{
      const response = await axios.post(`${API_BASE_URL}/register`, { 
        email: userId,
        password: password,
      });
      console.log('Registering user:', response.data);
      alert('Registration successful!');
    }
    catch(error){
      console.error('Registration Error:', error.response.data);
      alert(`Registration failed: ${error.response.data}`);
    }

    closeSignUpModal();  // Close modal after successful registration
 
  };
  // End of Handling Registration Modal------------------>
    

  // Handling Login Modal---------------------------->
  const captchaRef = useRef(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();
    
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
            email: loginEmail,
            password: loginPassword,
            token: token,
        });
        console.log('Logging in user:', response.data);
        alert('Login successful!');
        setUserEmail(loginEmail);
        setIsLoggedIn(true);
    } catch (error) {
        console.error('Login Error:', error.response.data);
        alert(`Login failed: ${error.response.data}`);
    }
    closeLoginModal(); // Close modal after login attempt
};

const handleLogout = () => {
  setUserEmail('');
  setIsLoggedIn(false);
}
// End of Handling Login Modal



  const featuresRef = useRef(null);
  const handleScrollToFeatures = () =>{
     featuresRef.current.scrollIntoView({behavior: 'smooth'});
  }; 

  //All functions above this line -----------------------------------> 

  return (
    
    <div>
      {isLoggedIn ? (
                <Dashboard email={userEmail} onLogout={handleLogout} />
              ) : (
                
        <div>
             
        { /*Navbar*/}
        <div className='flex flex-row justify-around items-center mt-5 py-3 border-b-[1px] border-gray-300'> 
            {/*navbar-brand*/}
            <div className='text-4xl text-blue-900 font-semibold flex flex-row'>
            <img src='/images/logo1.png' className='mr-2' width="60" height="50"></img>    Secure Docs
            </div>

            {/*Navbar-items*/}
            <div className='flex space-x-8 text-xl ml-20'>
                <a className='hover:text-blue-600' href='https://shiny-vicuna-0cb.notion.site/Blockchain-Based-Secured-Data-Sharing-1489a33133c780c5825fd9a49294504c'>About</a>
                <a className='hover:text-blue-600' href='#' onClick={handleScrollToFeatures}>Features</a>
                <a className='hover:text-blue-600' href='https://github.com/Jayant-Ramdurg/Secure-Docs'>Github</a>
            </div>

            <div className='ml-20'>
                {/*Login/Signup Button*/}
                <button onClick={openLoginModal} className='px-5 text-xl hover:text-blue-600'>
                    Login
                </button>
                <button onClick={openSignUpModal} className='bg-indigo-600 text-l text-white px-7 py-2.5 rounded-md hover:bg-blue-500'>
                    Sign Up
                </button>
            </div>
        </div>
        
        
      
         {/* Modal for Registration */}
      <Modal 
        isOpen={isSignUpModalOpen} 
        onRequestClose={closeSignUpModal} 
        contentLabel="Registration Modal"
        ariaHideApp={false} // Required for accessibility when not using React Modal's default app element
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h1 className='text-2xl font-semibold flex mb-2 justify-center items-center '>SignUp/ Register</h1>
        <form onSubmit={handleRegistration} className="space-y-5">
          <div>
            <label>Email ID :</label>
            <input 
              type="email" 
              value={userId} 
              onChange={(e) => setUserId(e.target.value)} 
              required 
              className="w-full border p-2 rounded"
              placeholder='Ex:- johndoe@gmail.com'
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
             <label>Confirm Password:</label>
             <input type="password"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               required className="w-full border p-2 rounded" />
          </div>

          <div className='flex flex-row justify-start'>
          <button 
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded mt-3"
            >
            Register
           </button>

            <button 
            onClick={closeSignUpModal} 
            className=" text-red-600 px-6 mt-3 ml-2 rounded hover:bg-red-600 hover:text-white">
            Close
          </button>
          </div>
        </form>    
      </Modal> 
       {/* Modal ends for Registration */}
       
    {/* Modal for Login */}
      
      <Modal 
        isOpen={isLoginModalOpen} 
        onRequestClose={closeLoginModal} 
        contentLabel="Login Modal"
        ariaHideApp={false} // Required for accessibility when not using React Modal's default app element
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h1 className='text-2xl font-semibold flex mb-2 justify-center items-center '> Login </h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label>Email ID :</label>
            <input 
              type="email" 
              value={loginEmail} 
              onChange={(e) => setLoginEmail(e.target.value)} 
              required 
              className="w-full border p-2 rounded"
              placeholder='Ex:- johndoe@gmail.com'
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              value={loginPassword} 
              onChange={(e) => setLoginPassword(e.target.value)} 
              required 
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label>CAPTCHA:</label>
            {/* CAPTCHA will be verified on button click */}
            <ReCAPTCHA 
                sitekey={import.meta.env.VITE_RECAPTCHA_ID}
                ref={captchaRef}/>
          </div>

          <div className='flex flex-row justify-start'>
          <button 
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded mt-3"
            >
            Login
          </button>

            <button 
            onClick={closeLoginModal} 
            className=" text-red-600 px-6 mt-3 ml-2 rounded hover:bg-red-600 hover:text-white">
            Close
          </button>
          </div>
        </form>
  
      </Modal>
       {/* Modal ends for Login*/}



       {/* Dont touch from here --------> */}

        {/* Hero Section */}
      <div className="px-10  flex flex-row justify-between items-center">
        
        {/* Text Column */}
        <div className="flex-1 flex flex-col px-20 ">
          <span className="text-4xl text-blue-900 font-bold">
            Empowering Secure Data Sharing 🔗 Through Blockchain
          </span>

          <span className="text-xl text-gray-500 py-5">
            Secure Docs is a decentralized platform that uses blockchain technology to securely share and store sensitive documents. Our mission is to help users create, store, and share their confidential data with confidence.
          </span>

          <span className="text-4xl mt-5 text-blue-900 font-bold">
            Trusted, Transparent and Secure🔒
          </span>

          <span className="text-xl text-gray-500 py-5">
            Your data deserves uncompromised security and accountability. Take control of your data with the future of secure data sharing.
          </span>
          
          <button className='mt-5 bg-indigo-600 text-xl text-white px-5 py-4 rounded-md  hover:bg-blue-500 w-80'>
             Get Started ⏩
          </button>
          
        </div>
        
        {/*File Graphics/Gif Column */}
        <div className="flex-1">
           <img src='/images/hero-img' className='rounded-xl mt-10' height='400' width='550'></img>
        </div>
      </div>
       
       <div ref={featuresRef} id='features'>
            <Features/>
       </div>
       
          
        </div>
        
        
      )}
        
    </div>
  )
}
export default HomePage








