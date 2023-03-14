import Footer from '../Footer';
import Header from '../Header';
import './index.scss';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <div className='pageWrapper'>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
