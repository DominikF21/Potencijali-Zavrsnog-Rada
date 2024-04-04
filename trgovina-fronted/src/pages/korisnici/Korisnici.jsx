import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import KorisnikService from "../../services/KorisnikService";
// import { NumericFormat } from "react-number-format";
// import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { dohvatiPorukeAlert } from "../../services/httpService";


export default function Korisnici(){
    const [korisnici,setKorisnici] = useState();
    const navigate = useNavigate();

    async function dohvatiKorisnike(){
        const odgovor = await KorisnikService.getKorisnici();
        if(!odgovor.ok){
            alert(dohvatiPorukeAlert(odgovor.podaci));
            return;
        }
        setKorisnici(odgovor.podaci);
    }

    async function obrisiKorisnik(sifra){
        const odgovor = await KorisnikService.obrisiKorisnik(sifra);
        alert(dohvatiPorukeAlert(odgovor.podaci));
        if (odgovor.ok){
            dohvatiKorisnike();
        }
    }


     // Ovo se poziva dvaput u dev ali jednom u produkciji
    // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    useEffect(()=>{
        dohvatiKorisnike();
    },[]);


    return (

        <Container>
            <Link to={RoutesNames.KORISNICI_NOVI} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>korisnickoIme</th>
                        <th>Uredi</th>
                    </tr>
                </thead>
                <tbody>
                    {korisnici && korisnici.map((korisnik,index)=>(
                        <tr key={index}>
                            <td>{korisnik.korisnickoIme}</td>
                           
                           
                            <td className="sredina">
                                <Button 
                                variant="primary"
                                onClick={()=>{navigate(`/korisnici/${korisnik.sifra}`)}}>
                                    <FaEdit 
                                    size={25}
                                    />
                                </Button>
                                
                                    &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={()=>obrisiKorisnik(korisnik.sifra)}
                                >
                                    <FaTrash  
                                    size={25}
                                    />
                                </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}