import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Service from "../../services/ProizvodService";
import { RoutesNames } from "../../constants";
import { dohvatiPorukeAlert } from "../../services/httpService";

export default function ProizvodiPromjeni(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [proizvod, setProizvod] = useState({});

    async function dohvatiProizvod(){
          const odgovor = await Service.getBySifra(routeParams.sifra)
          if(!odgovor.ok){
            alert(dohvatiPorukeAlert(odgovor.podaci));
            navigate(RoutesNames.PROIZVODI_PREGLED);
              return;
          }
          setProizvod(odgovor.podaci);
    }

    useEffect(()=>{
        dohvatiProizvod();
    },[]);

    async function ProizvodiPromjeni(proizvod){
          const odgovor = await Service.ProizvodiPromjeni(routeParams.sifra,proizvod);
          if(odgovor.ok){
            navigate(RoutesNames.PROIZVODI_PREGLED);
            return;
          }
          alert(dohvatiPorukeAlert(odgovor.podaci));
        }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);

        ProizvodiPromjeni({
            Proizvod: podaci.get('proizvod'),
            Cijena: podaci.get('cijena'),
        });
    }


    return (

        <Container>
           
           <Form onSubmit={handleSubmit}>

                <Form.Group controlId="Proizvod">
                    <Form.Label>Ime Proizvoda</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={proizvod.proizvod}
                        name="Proizvod"
                    />
                </Form.Group>

                <Form.Group controlId="Cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control 
                        type="number"
                        defaultValue={proizvod.cijena}
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
                            Promjeni Proizvod
                        </Button>
                    </Col>
                </Row>
                
           </Form>

        </Container>

    );

}