import './Header.css';
import logomain from './SvgFiles/logomain.svg';

function Header() {
  return (
    <div className="Header">
      <header-Header className="App-header">
        <h1> 
                Compound Interest Calculator 
        </h1>
        {/*<img src={logomain} className="Header-logo" alt="logomain"/>*/}
      </header-Header>
    </div>
  );
}

export default Header;