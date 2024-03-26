import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import KorisnikService from "../../services/KorisnikService";

export default function KorisniciDodaj(){
    const navigate = useNavigate();


    async function dodajKorisnik(korisnik){
        const odgovor = await SKorisnikService.dodajKorisnik(korisnik);
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
            naziv: podaci.get('naziv'),
            trajanje: parseInt(podaci.get('trajanje')),
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

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control 
                        type="text"
                        name="naziv"
                    />
                </Form.Group>

                <Form.Group controlId="trajanje">
                    <Form.Label>Trajanje</Form.Label>
                    <Form.Control 
                        type="text"
                        name="trajanje"
                    />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control 
                        type="text"
                        name="cijena"
                    />
                </Form.Group>

                <Form.Group controlId="upisnina">
                    <Form.Label>Upisnina</Form.Label>
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
                            Dodaj korisnik
                        </Button>
                    </Col>
                </Row>

           </Form>

        </Container>

    );
}