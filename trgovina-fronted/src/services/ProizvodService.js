import  { httpService, obradiGresku, obradiUspjeh } from "./httpService";

async function getProizvod(){
    return await httpService.get('/Proizvod')
        .then((res)=>{
            return obradiUspjeh(res);
        }).catch((e)=>{
            return obradiGresku(e);
        });
}

async function obrisiProizvod(sifra){
    return await httpService.delete('/Proizvod/' + sifra)
        .then((res)=>{
            return obradiUspjeh(res);
        }).catch((e)=>{
            return obradiGresku(e);
        });
}

async function dodajProizvod(proizvod){
    const odgovor = await httpService.post('/Proizvod',proizvod)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno dodano'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function promjeniProizvod(sifra,proizvod){
    return await httpService.put('/Proizvod/'+sifra, proizvod)
        .then((res)=>{
            return obradiUspjeh(res);
        }).catch((e)=>{
            return obradiGresku(e);
        });
}

async function getBySifra(sifra){
    return await httpService.get('/Proizvod/' + sifra)
        .then((res)=>{
            return obradiUspjeh(res);
        }).catch((e)=>{
            return obradiGresku(e);
        });
}



export default{
    getProizvod,
    obrisiProizvod,
    dodajProizvod,
    promjeniProizvod,
    getBySifra
};