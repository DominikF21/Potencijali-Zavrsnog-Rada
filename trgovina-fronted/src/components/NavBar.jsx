import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { RoutesNames } from '../constants';

import './NavBar.css';


function NavBar() {
  
    const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand 
            className='linkPocetna'
            onClick={()=>navigate(RoutesNames.HOME)}
        >
            Trgovina APP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <NavDropdown title="Programi" id="basic-nav-dropdown">
            <NavDropdown.Item 
                onClick={()=>navigate(RoutesNames.KORISNICI_PREGLED)}
              >
                Korisnici
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Djelatnice
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Stavke
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={()=>navigate(RoutesNames.PROIZVODI_PREGLED)}
              >
                Proizvodi
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
        <Nav.Link target="_blank" href="http://dominikf21-001-site1.ftempurl.com/swagger/index.html">API dokumentacija</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;