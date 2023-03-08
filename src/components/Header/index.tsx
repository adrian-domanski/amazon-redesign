import './styles.css';
import { BiSearch } from 'react-icons/bi';
import { MdShoppingBasket } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';

function Header() {
  const [{ basket }] = useGlobalContext();

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
        <div className='header__option'>
          <span className='header__optionLineOne'>Hello Guest</span>
          <span className='header__optionLineTwo'>Sign In</span>
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
