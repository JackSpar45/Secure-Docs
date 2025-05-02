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
        <div className='sticky top-0 z-50 bg-white/30 backdrop-blur-md border-b-[1px] border-gray-300/80'>
          <div className='flex flex-row justify-between items-center py-3 mx-auto max-w-7xl px-4 sm:px-6'>
            {/* Mobile Menu Button */}
            <button 
              className='lg:hidden p-2 text-blue-900 hover:text-blue-600'
              onClick={() => document.querySelector('.nav-items').classList.toggle('hidden')}
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>

            {/* Logo (centered on mobile) */}
            <div className='text-3xl lg:text-4xl text-blue-900 font-semibold flex flex-row items-center'>
              <img src='/images/logo1.png' className='mr-2' width="50" height="40" alt="Logo" />
              Secure Docs
            </div>

            {/* Desktop Navigation (hidden on mobile) */}
            <div className='hidden lg:flex space-x-8 text-xl ml-20'>
              <a className='hover:text-blue-600' href='https://shiny-vicuna-0cb.notion.site/Blockchain-Based-Secured-Data-Sharing-1489a33133c780c5825fd9a49294504c'>About</a>
              <a className='hover:text-blue-600' href='#' onClick={handleScrollToFeatures}>Features</a>
              <a className='hover:text-blue-600' href='https://github.com/JackSpar45/Secure-Docs'>Github</a>
            </div>

            {/* Desktop Buttons (hidden on mobile) */}
            <div className='hidden lg:flex ml-20'>
              <button onClick={openLoginModal} className='px-5 text-xl hover:text-blue-600'>Login</button>
              <button onClick={openSignUpModal} className='bg-indigo-600 text-white px-7 py-2.5 rounded-md hover:bg-blue-500'>Sign Up</button>
            </div>
          </div>

          {/* Mobile Navigation Items (hidden by default) */}
          <div className='nav-items hidden lg:hidden bg-white/50 backdrop-blur-sm px-4 pb-4'>
            <div className='flex flex-col space-y-4'>
              <a className='text-blue-900 hover:text-blue-600 text-lg' href='https://shiny-vicuna-0cb.notion.site/Blockchain-Based-Secured-Data-Sharing-1489a33133c780c5825fd9a49294504c'>About</a>
              <a className='text-blue-900 hover:text-blue-600 text-lg' href='#' onClick={handleScrollToFeatures}>Features</a>
              <a className='text-blue-900 hover:text-blue-600 text-lg' href='https://github.com/JackSpar45/Secure-Docs'>Github</a>
              <div className='flex space-x-4'>
                <button onClick={openLoginModal} className='flex-1 text-blue-900 hover:text-blue-600 py-2 border border-blue-900 rounded'>Login</button>
                <button onClick={openSignUpModal} className='flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-blue-500'>Sign Up</button>
              </div>
            </div>
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
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-x-20">
            {/* Text Column */}
            <div className="flex-1 flex flex-col order-1 md:order-none">
              <h1 className="text-4xl text-blue-900 font-bold leading-tight">
                Empowering Secure Data Sharing 🔗 Through Blockchain
              </h1>

              <p className="text-lg md:text-xl text-gray-600 py-6">
                Secure Docs is a decentralized platform that uses blockchain technology to securely share and store sensitive documents. Our mission is to help users create, store, and share their confidential data with confidence.
              </p>

              <h2 className="text-3xl md:text-4xl text-blue-900 font-bold mt-4">
                Trusted, Transparent and Secure🔒
              </h2>

              <p className="text-lg md:text-xl text-gray-600 py-6">
                Your data deserves uncompromised security and accountability. Take control of your data with the future of secure data sharing.
              </p>
              
              <button className='mt-4 bg-indigo-600 text-xl text-white px-8 py-4 rounded-md hover:bg-blue-500 w-full md:w-80'>
                Get Started ⏩
              </button>
            </div>
            
            {/* Image Column */}
            <div className="flex-1 order-0 md:order-none mb-12 md:mb-0">
              <img 
                src='/images/hero-img' // Make sure to add proper file extension
                alt='Secure Docs Illustration'
                className='rounded-xl w-full h-auto object-cover shadow-xl'
              />
            </div>
          </div>
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








