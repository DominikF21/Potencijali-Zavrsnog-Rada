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
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function promjeniKorisnik(sifra,){
    const odgovor = await httpService.put('/Korisnik/'+sifra)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno promjnjeno'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function getBySifra(sifra){
    return await httpService.get('/Korisnik/' + sifra)
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
        return {poruka: e}
    });
}



export default{
    getKorisnici,
    obrisiKorisnik,
    dodajKorisnik,
    promjeniKorisnik,
    getBySifra
};