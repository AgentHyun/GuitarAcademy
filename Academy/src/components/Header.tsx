interface HeaderProps {
  scrollToSection: (section: 'home' | 'location' | 'shorts' | 'schedule' | 'photo') => void;
}

const Header = ({ scrollToSection }: HeaderProps) => (
  <div className="header">
    <img
      src="./이충실용음악학원.png"
      alt="로고"
      style={{ width: '20%', marginLeft: '-30px' }}
    />
    <nav className="nav" style={{ marginBottom: '20px' }}>
      <button className='header-menu' onClick={() => scrollToSection('home')}>HOME</button>
      <button className='header-menu' onClick={() => scrollToSection('location')}>LOCATION</button>
      <button className='header-menu' onClick={() => scrollToSection('photo')}>PHOTO</button>
      <button className='header-menu' onClick={() => scrollToSection('shorts')}>SHORTS</button>
      <button className='header-menu' onClick={() => scrollToSection('schedule')}>SCHEDULE</button>
    </nav>
  </div>
);

export default Header;
