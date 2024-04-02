import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import KorisnikService from "../../services/KorisnikService";
import { RoutesNames } from "../../constants";
import { dohvatiPorukeAlert } from "../../services/httpService";

export default function KorisniciPromjeni(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [korisnik,setKorisnik] = useState({});

    async function dohvatiKorisnike(){
        const odgovor = await KorisnikService.getBySifra(routeParams.sifra)
        if(!odgovor.ok){
            alert(dohvatiPorukeAlert(odgovor.podaci));
            return;
        }
        setKorisnik(odgovor.podaci);
    }

    useEffect(()=>{
        //console.log("useEffect")
        dohvatiKorisnike();
    },[]);

    async function promjeniKorisnika(korisnik){
        const odgovor = await KorisnikService.promjeniKorisnika(routeParams.sifra,korisnik);
        if(odgovor.ok){
          navigate(RoutesNames.KORISNICI_PREGLED);
          return;
        }
        alert(dohvatiPorukeAlert(odgovor.podaci));
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);

        const korisnik = 
        {
            naziv: podaci.get('naziv'),
            trajanje: parseInt(podaci.get('trajanje')),
            cijena: parseFloat(podaci.get('cijena')),
            upisnina: parseFloat(podaci.get('upisnina')),
            verificiran: podaci.get('verificiran')=='on' ? true: false
          };

          //console.log(JSON.stringify(korisnik));
          promjeniKorisnika(korisnik);
    }


    return (

        <Container>
           
           <Form onSubmit={handleSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={korisnik.naziv}
                        name="naziv"
                    />
                </Form.Group>

                <Form.Group controlId="trajanje">
                    <Form.Label>Trajanje</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={korisnik.trajanje}
                        name="trajanje"
                    />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={korisnik.cijena}
                        name="cijena"
                    />
                </Form.Group>

                <Form.Group controlId="upisnina">
                    <Form.Label>Upisnina</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={korisnik.upisnina}
                        name="upisnina"
                    />
                </Form.Group>

                <Form.Group controlId="verificiran">
                    <Form.Check 
                        label="Verificiran"
                        defaultChecked={korisnik.verificiran}
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
                            Promjeni korisnika
                        </Button>
                    </Col>
                </Row>
                
           </Form>

        </Container>

    );

}