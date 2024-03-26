import { App } from "../constants"
import { httpService } from "./httpService";
async function getKorisnici(){
    return await httpService.get('/Korisnik')
    .then((res)=>{
        if(App.DEV) console.table(res.data);
        return res;
    }).catch((e)=>{
        console.log(e);
    });
}

async function obrisiKorisnik(sifra){
    return await httpService.delete('/Korisnik/' + sifra)
    .then((res)=>{
        return {ok: true, poruka: res};
    }).catch((e)=>{
        console.log(e);
    });
}

async function dodajKorisnik(korisnik){
    const odgovor = await httpService.post('/Korisnik',korisnik)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno dodano'}
    })
    .catch((e)=>{
        //console.log(e.response.data.errors.Naziv[0]);
        return {ok: false, poruka: e.response.data.errors.Naziv[0]}
    });
    return odgovor;
}




export default{
    getKorisnici,
    obrisiKorisnik,
    dodajKorisnik
};