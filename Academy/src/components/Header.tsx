const Header = () => (
  <div className="header">
    <img src="./이충실용음악학원.png" alt="로고" style={{ width: '20%', marginLeft: '-30px' }} />
    <nav className="nav" style={{ marginBottom: '20px' }}>
      <button className='header-menu'>HOME</button>
      <button className='header-menu'>LOCATION</button>
      <button className='header-menu'>SHORTS</button>
      <button className='header-menu'>SCHEDULE</button>
    </nav>
  </div>
);

export default Header;
