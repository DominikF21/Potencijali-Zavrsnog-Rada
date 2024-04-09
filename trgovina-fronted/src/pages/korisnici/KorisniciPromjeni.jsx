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
            korisnickoIme: podaci.get('korisnickoIme'),
            lozinka: parseInt(podaci.get('lozinka')),
          };

          //console.log(JSON.stringify(korisnik));
          promjeniKorisnika(korisnik);
    }


    return (

        <Container>
           
           <Form onSubmit={handleSubmit}>

           <Form.Group controlId="KorisnickoIme">
                    <Form.Label>Korisnicko Ime</Form.Label>
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
                            Promjeni korisnika
                        </Button>
                    </Col>
                </Row>
                
           </Form>

        </Container>

    );

}