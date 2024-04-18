import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ProizvodService from "../../services/ProizvodService";
import { RoutesNames } from "../../constants";
import { dohvatiPorukeAlert } from "../../services/httpService";

export default function ProizvodiDodaj(){
    const navigate = useNavigate();


    async function dodajProizvod(Proizvod){
        const odgovor = await ProizvodService.dodajProizvod(Proizvod);
        if(odgovor.ok){
          navigate(RoutesNames.PROIZVODI_PREGLED);
          return
        }

        alert(dohvatiPorukeAlert(odgovor.podaci));
        
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        // console.log(podaci.get('naziv'));

        const proizvod = 
        {
            naziv: podaci.get('naziv'),
            cijena: podaci.get('cijena'),
          };

        //   console.log(JSON.stringify(proizvod));
        dodajProizvod(proizvod);


    }

    return (

        <Container>

           <Form onSubmit={handleSubmit}>

                <Form.Group controlId="Proizvod">
                    <Form.Label>Ime Proizvoda</Form.Label>
                    <Form.Control 
                        type="text and number"
                        name="naziv"
                    />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control 
                        type="currency"
                        name="cijena"
                    />
                </Form.Group>


                <Row className="akcije">
                    <Col>
                        <Link 
                        className="btn btn-danger"
                        to={RoutesNames.PROIZVODI_PREGLED}>Odustani</Link>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Dodaj proizvod
                        </Button>
                    </Col>
                </Row>

           </Form>

        </Container>

    );

}