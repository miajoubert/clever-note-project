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
            className='landingPic'
            src="https://image.freepik.com/free-photo/blank-notebook-pen-brown-paper-white-desk-background_42493-78.jpg"
          ></img>
          <div className='home-text-container'>
            <div className='splash-line'>Tame your work, organize your life</div>
            <div className='splash-line-small'>Remember everything and tackle any project with your notes and reminders all in one place.</div>
          </div>
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
          <img
            className='homePic'
            src="https://image.freepik.com/free-photo/blank-notebook-pen-brown-paper-white-desk-background_42493-78.jpg"
          ></img>
          <div className='welcomeDiv'>
            <div className='welcome'>Welcome, </div>
            <div className='welcome'>{user}!</div>
            <div className='navigateTo'>
              Select <u>Notes</u> or <u> Notebooks</u> to begin.
            </div>
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
