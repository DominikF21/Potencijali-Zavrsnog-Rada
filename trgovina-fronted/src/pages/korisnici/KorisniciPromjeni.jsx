import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Service from "../../services/KorisnikService";
import { RoutesNames } from "../../constants";
import { dohvatiPorukeAlert } from "../../services/httpService";
import useLoading from "../../hooks/useLoading";


export default function KorisniciPromjeni(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [korisnik, setKorisnik] = useState({});
    const { showLoading, hideLoading } = useLoading();

    

    async function dohvatiKorisnike(){
        showLoading();
          const odgovor = await Service.getBySifra(routeParams.sifra)
          if(!odgovor.ok){
            alert(dohvatiPorukeAlert(odgovor.podaci));
            navigate(RoutesNames.KORISNICI_PREGLED);
              return;
          }
          setKorisnik(odgovor.podaci);
          hideLoading();
    }

    useEffect(()=>{
        dohvatiKorisnike();
    },[]); 

    async function promjeniKorisnika(korisnik){
        showLoading();
          const odgovor = await Service.promjeniKorisnik(routeParams.sifra,korisnik);
          if(odgovor.ok){
            navigate(RoutesNames.KORISNICI_PREGLED);
            hideLoading();
            return;
          }
          alert(dohvatiPorukeAlert(odgovor.podaci));
          hideLoading();
        }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);

        promjeniKorisnika({
            korisnickoIme: podaci.get('korisnickoIme'),
            lozinka: podaci.get('lozinka'),
        });
    }


    return (

        <Container>
           
           <Form onSubmit={handleSubmit}>

                <Form.Group controlId="KorisnickoIme">
                    <Form.Label>Korisnicko Ime</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={korisnik.korisnickoIme}
                        name="korisnickoIme"
                    />
                </Form.Group>

                <Form.Group controlId="lozinka">
                    <Form.Label>Lozinka</Form.Label>
                    <Form.Control 
                        type="password"
                        defaultValue={korisnik.lozinka}
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