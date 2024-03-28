import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import KorisnikService from "../../services/KorisnikService";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function Korisnici(){
    const [korisnici,setKorisnici] = useState();
    const navigate = useNavigate();

    async function dohvatiKorisnike(){
        await KorisnikService.getKorisnici()
        .then((res)=>{
            setKorisnici(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }
     // Ovo se poziva dvaput u dev ali jednom u produkciji
    // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    useEffect(()=>{
        dohvatiKorisnike();
    },[]);

    function verificiran(korisnik){
        if (korisnik.verificiran==null) return 'gray';
        if(korisnik.verificiran) return 'green';
        return 'red';
    }
    
    function verificiranTitle(korisnik){
        if (korisnik.verificiran==null) return 'Nije definirano';
        if(korisnik.verificiran) return 'Verificiran';
        return 'NIJE verificiran';
    }

    async function obrisiKorisnika(sifra){
        const odgovor = await KorisnikService.obrisiKorisnika(sifra);
        if (odgovor.ok){
            alert(odgovor.poruka.data.poruka);
            dohvatiKorisnike();
        }

    }



    return (

        <Container>
            <Link to={RoutesNames.korisnici_NOVI} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>-----</th>
                        <th>-----</th>
                        <th>-----</th>
                        <th>-----</th>
                        <th>-----</th>
                    </tr>
                </thead>
                <tbody>
                    {korisnici && korisnici.map((korisnik,index)=>(
                        <tr key={index}>
                            <td>{korisnik.naziv}</td>
                            <td className="desno">{korisnik.trajanje}</td>
                            <td className={korisnik.cijena==null ? 'sredina' : 'desno'}>
                                {korisnik.cijena==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={korisnik.cijena}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    prefix={'€'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                }
                            </td>
                            <td className={korisnik.upisnina==null ? 'sredina' : 'desno'}>
                                {korisnik.upisnina==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={korisnik.upisnina}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    prefix={'€'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                }
                            </td>
                            <td className="sredina">
                            <GrValidate 
                            size={30} 
                            color={verificiran(korisnik)}
                            title={verificiranTitle(korisnik)}
                            />
                            </td>
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
                                    onClick={()=>obrisiKorisnika(korisnik.sifra)}
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