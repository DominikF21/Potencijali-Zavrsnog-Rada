import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Service from "../../services/KorisnikService";
import { RoutesNames } from "../../constants";
import { dohvatiPorukeAlert } from "../../services/httpService";

export default function KorisniciPromjeni(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [korisnik,setKorisnik] = useState({});

    async function dohvatiKorisnike(){
          const odgovor = await Service.getBySifra('Korisnik',routeParams.sifra)
          if(!odgovor.ok){
            alert(dohvatiPorukeAlert(odgovor.podaci));
            navigate(RoutesNames.KORISNICI_PREGLED);
              return;
          }
          setKorisnik(odgovor.podaci);
    }

    useEffect(()=>{
        dohvatiKorisnike();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    async function promjeniKorisnika(korisnik){
          const odgovor = await Service.promjeniKorisnik(routeParams.sifra,korisnik);
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
            lozinka: podaci.get('lozinka'),
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
                        type="text"
                        name="korisnickoIme"
                    />
                </Form.Group>

                <Form.Group controlId="lozinka">
                    <Form.Label>Lozinka</Form.Label>
                    <Form.Control 
                        type="password"
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