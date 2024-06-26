import  { httpService, obradiGresku, obradiUspjeh } from "./httpService";

async function getKorisnici(){
    return await httpService.get('/Korisnik')
        .then((res)=>{
            return obradiUspjeh(res);
        }).catch((e)=>{
            return obradiGresku(e);
        });
}

async function obrisiKorisnik(sifra){
    return await httpService.delete('/Korisnik/' + sifra)
        .then((res)=>{
            return obradiUspjeh(res);
        }).catch((e)=>{
            return obradiGresku(e);
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
// async function dodajKorisnik(korisnik){
//     return await httpService.post('/Korisnik',korisnik)
//         .then((res)=>{
//             return obradiUspjeh(res);
//         }).catch((e)=>{
//             return obradiGresku(e);
//         });
// }

async function promjeniKorisnik(sifra,korisnik){
    return await httpService.put('/Korisnik/'+sifra, korisnik)
        .then((res)=>{
            return obradiUspjeh(res);
        }).catch((e)=>{
            return obradiGresku(e);
        });
}

async function getBySifra(sifra){
    return await httpService.get('/Korisnik/' + sifra)
        .then((res)=>{
            return obradiUspjeh(res);
        }).catch((e)=>{
            return obradiGresku(e);
        });
}



export default{
    getKorisnici,
    obrisiKorisnik,
    dodajKorisnik,
    promjeniKorisnik,
    getBySifra
};