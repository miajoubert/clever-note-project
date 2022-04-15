import { useSelector } from 'react-redux';
import Footer from '../Navigation/Footer';

import './LandingPage.css'

function LandingPage() {
  const sessionUser = useSelector(state => state.session.user);
  const user = sessionUser?.username

  if (!sessionUser) {
    return (
      <>
        <div className='homeDiv'>
          <img
            className='homePic'
            src="https://image.freepik.com/free-photo/blank-notebook-pen-brown-paper-white-desk-background_42493-78.jpg"
          ></img>
        </div>
        <div>
          <Footer />
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='homeDiv'>
          <div className='welcomeDiv'>
            <div className='welcome'>Welcome, </div>
            <div className='welcome'>{user}!</div>
          </div>
          <img
            className='homePic'
            src="https://image.freepik.com/free-photo/blank-notebook-pen-brown-paper-white-desk-background_42493-78.jpg"
          ></img>
          <div className='navigateTo'>
            Navigate to <u>Notes</u> or <u>Notebooks</u> above to begin your journey on <span className="clevernote">Clevernote</span>...
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </>
    )
  }
}

export default LandingPage;
