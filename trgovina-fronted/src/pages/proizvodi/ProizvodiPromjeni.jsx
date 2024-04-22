import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Service from "../../services/ProizvodService";
import { RoutesNames } from "../../constants";
import { dohvatiPorukeAlert } from "../../services/httpService";
import useLoading from '../../hooks/useLoading';


export default function ProizvodPromjeni(){
    const [proizvod, setProizvod] = useState({});

    const navigate = useNavigate();
    const routeParams = useParams();
    const { showLoading, hideLoading } = useLoading();


    async function dohvatiProizvode(){
        showLoading();
          const odgovor = await Service.getBySifra(routeParams.sifra)
          if(!odgovor.ok){
            alert(dohvatiPorukeAlert(odgovor.podaci));
            navigate(RoutesNames.PROIZVODI_PREGLED);
            hideLoading();
              return;
          }
          setProizvod(odgovor.podaci);
          hideLoading();
    }

    useEffect(()=>{
        dohvatiProizvode();
    },[]);

    async function ProizvodPromjeni(proizvod){
        showLoading();
          const odgovor = await Service.promjeniProizvod(routeParams.sifra,proizvod);
          if(odgovor.ok){
            hideLoading();
            navigate(RoutesNames.PROIZVODI_PREGLED);
            return;
          }
          alert(dohvatiPorukeAlert(odgovor.podaci));
          hideLoading();
        }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);

        ProizvodPromjeni({
            naziv: podaci.get('naziv'),
            cijena: podaci.get('cijena'),
        });
        
    }


    return (

        <Container>
           
           <Form onSubmit={handleSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Ime Proizvoda</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={proizvod.naziv}
                        name="naziv"
                    />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control 
                        type="currency"
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