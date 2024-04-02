import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import KorisnikService from "../../services/KorisnikService";
import { RoutesNames } from "../../constants";

export default function KorisniciDodaj(){
    const navigate = useNavigate();


    async function dodajKorisnik(korisnik){
        const odgovor = await KorisnikService.dodajKorisnik(korisnik);
        if(odgovor.ok){
          navigate(RoutesNames.KORISNICI_PREGLED);
        }else{
          console.log(odgovor);
          alert(odgovor.poruka);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        //console.log(podaci.get('naziv'));

        const korisnik = 
        {
            naziv: podaci.get('korisnickoIme'),
            trajanje: parseInt(podaci.get('lozinka')),
            cijena: parseFloat(podaci.get('cijena')),
            upisnina: parseFloat(podaci.get('upisnina')),
            verificiran: podaci.get('verificiran')=='on' ? true: false
          };

          //console.log(JSON.stringify(korisnik));
          dodajKorisnik(korisnik);


    }

    return (

        <Container>

           <Form onSubmit={handleSubmit}>

                <Form.Group controlId="KorisnickoIme">
                    <Form.Label>KorisnickoIme</Form.Label>
                    <Form.Control 
                        type="text"
                        name="naziv"
                    />
                </Form.Group>

                <Form.Group controlId="lozinka">
                    <Form.Label>Lozinka</Form.Label>
                    <Form.Control 
                        type="text"
                        name="lozinka"
                    />
                </Form.Group>

                <Form.Group controlId="-----">
                    <Form.Label>-----</Form.Label>
                    <Form.Control 
                        type="text"
                        name="cijena"
                    />
                </Form.Group>

                <Form.Group controlId="-----">
                    <Form.Label>-----</Form.Label>
                    <Form.Control 
                        type="text"
                        name="upisnina"
                    />
                </Form.Group>

                <Form.Group controlId="verificiran">
                    <Form.Check 
                        label="Verificiran"
                        name="verificiran"
                    />
                </Form.Group>

                <Row className="akcije">
                    <Col>
                        <Link 
                        className="btn btn-danger"
                        to={RoutesNames.KORISNICI_PREGLED}>Odustani</Link>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Dodaj korisnika
                        </Button>
                    </Col>
                </Row>

           </Form>

        </Container>

    );

}