import { Link } from 'react-router-dom';
import './styles.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <p>
          &copy; 1996-{new Date().getFullYear()}, <Link to=''>Amazon.com</Link>,
          Inc. or its affiliates
        </p>
      </div>
    </footer>
  );
};

export default Footer;
