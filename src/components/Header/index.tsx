import './styles.scss';
import { BiSearch } from 'react-icons/bi';
import { MdShoppingBasket } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import ConditionalLink from '../ConditionalLink';
import { auth } from '../../utils/firebase';
import { signOut } from 'firebase/auth';

function Header() {
  const [{ basket, user }] = useGlobalContext();

  const handleAuth = () => {
    if (user) {
      signOut(auth);
    }
  };

  return (
    <div className='header'>
      <Link to='/'>
        <img
          src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
          alt='Amazon'
          className='header__logo'
        />
      </Link>

      <div className='header__search'>
        <input type='text' className='header__searchInput' />
        <BiSearch className='header__searchIcon' />
      </div>

      <div className='header__nav'>
        <div className='header__option' onClick={handleAuth}>
          <ConditionalLink to='/login' condition={!user}>
            <span className='header__optionLineOne'>
              Hello {user?.email || 'Guest'}{' '}
            </span>
            {user ? (
              <span className='header__optionLineTwo'>Sign Out</span>
            ) : (
              <span className='header__optionLineTwo'>Sign In</span>
            )}
          </ConditionalLink>
        </div>
        <div className='header__option'>
          <span className='header__optionLineOne'>Returns</span>
          <span className='header__optionLineOne'>& Orders</span>
        </div>
        <div className='header__option'>
          <span className='header__optionLineOne'>Your</span>
          <span className='header__optionLineOne'>Prime</span>
        </div>
      </div>

      <Link to='/checkout'>
        <div className='header__optionBasket'>
          <MdShoppingBasket />
          <span className='header__optionLineTwo header__basketCount'>
            {basket?.length}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default Header;
