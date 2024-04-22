import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import ProizvodService from "../../services/ProizvodService";
import { NumericFormat } from "react-number-format";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { dohvatiPorukeAlert } from "../../services/httpService";
import useLoading from "../../hooks/useLoading";


export default function Proizvodi(){
    const [proizvod,setProizvod] = useState();
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();


    async function dohvatiProizvode(){
        showLoading();
        const odgovor = await ProizvodService.getProizvod();
        if(!odgovor.ok){
            alert(dohvatiPorukeAlert(odgovor.podaci));
            hideLoading();
            return;
        }
        setProizvod(odgovor.podaci);
        hideLoading();
    }

    async function obrisiProizvod(sifra){
        showLoading();
        const odgovor = await ProizvodService.obrisiProizvod(sifra);
        alert(dohvatiPorukeAlert(odgovor.podaci));
        if (odgovor.ok){
            dohvatiProizvode();
        }
        hideLoading();
    }


     // Ovo se poziva dvaput u dev ali jednom u produkciji
    // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    useEffect(()=>{
        dohvatiProizvode();
    },[]);


    return (

        <Container>
            <Link to={RoutesNames.PROIZVODI_NOVI} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Proizvod</th>
                        <th>Cijena</th>
                        <th>Uredi</th>
                    </tr>
                </thead>
                <tbody>
                    {proizvod && proizvod.map((proizvod,index)=>(
                        <tr key={index}>
                            <td>{proizvod.naziv}</td>
                            <td className={proizvod.cijena==null ? 'sredina' : 'desno'}>
                                {proizvod.cijena==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={proizvod.cijena}
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
                                <Button 
                                variant="primary"
                                onClick={()=>{navigate(`/proizvodi/${proizvod.sifra}`)}}>
                                    <FaEdit 
                                    size={25}
                                    />
                                </Button>
                                
                                    &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={()=>obrisiProizvod(proizvod.sifra)}
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