import { useSelector } from 'react-redux';

import './Footer.css'

function Footer() {
  return (
    <>
      <div className='container'></div>
      <div className='footer-top'></div>

      <div className='footer-bottom'>
        <div className='links'>
          <a
            href='https://github.com/miajoubert'
            target='_blank'
            rel='noopener noreferrer'
            className="github-footer"
          >
            <span className="fab fa-github" />
            Mia Joubert
          </a>

          <a
            href='https://www.linkedin.com/in/miajoubert/'
            target='_blank'
            rel='noopener noreferrer'
            className="github-footer"
          >
            <span className="fab fa-linkedin" />
            Mia Joubert
          </a>

          <a
            href='https://github.com/miajoubert/clevernote-project'
            target='_blank'
            rel='noopener noreferrer'
            className="github-footer"
          >
            <span className="fab fa-github" />
            Clevernote
          </a>
        </div>

        <div className='copyright'>
          © 2022 Evernote Clone
        </div>
      </div>
    </>
  )
}

export default Footer;
