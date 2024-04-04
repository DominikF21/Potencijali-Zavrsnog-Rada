import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import KorisnikService from "../../services/KorisnikService";
import { RoutesNames } from "../../constants";
import { dohvatiPorukeAlert } from "../../services/httpService";

export default function dodajKorisnik(){
    const navigate = useNavigate();


    async function dodajKorisnik(korisnik){
        const odgovor = await KorisnikService.dodajKorisnik(korisnik);
        if(odgovor.ok){
          navigate(RoutesNames.KORISNICI_PREGLED);
          return
        }

        alert(dohvatiPorukeAlert(odgovor.podaci));
        
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        // console.log(podaci.get('naziv'));

        const korisnik = 
        {
            korisnickoIme: podaci.get('korisnickoIme'),
            lozinka: parseInt(podaci.get('lozinka')),
          };

        //   console.log(JSON.stringify(korisnik));
          dodajKorisnik(korisnik);


    }

    return (

        <Container>

           <Form onSubmit={handleSubmit}>

                <Form.Group controlId="KorisnickoIme">
                    <Form.Label>KorisnickoIme</Form.Label>
                    <Form.Control 
                        type="text and number"
                        name="naziv"
                    />
                </Form.Group>

                <Form.Group controlId="lozinka">
                    <Form.Label>Lozinka</Form.Label>
                    <Form.Control 
                        type="text and number"
                        name="lozinka"
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