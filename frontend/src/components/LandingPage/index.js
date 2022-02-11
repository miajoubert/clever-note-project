import { useSelector } from 'react-redux';

import './LandingPage.css'

function LandingPage() {
  const sessionUser = useSelector(state => state.session.user);
  const user = sessionUser?.username

  if (!sessionUser) {
    return (
      <div className='homeDiv'>
        <img
          className='homePic'
          src="https://image.freepik.com/free-photo/blank-notebook-pen-brown-paper-white-desk-background_42493-78.jpg"
        ></img>
      </div>
    )
  } else {
    return (
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
          Navigate to <b>Notes</b> or <b>Notebooks</b> to begin your Clevernote journey...
        </div>
      </div>
    )
  }
}

export default LandingPage;
