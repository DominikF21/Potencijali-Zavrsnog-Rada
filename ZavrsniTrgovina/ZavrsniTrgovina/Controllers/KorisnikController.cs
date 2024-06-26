﻿using Microsoft.AspNetCore.Mvc;
using Zavrsni_Trgovina.Data;
using Zavrsni_Trgovina.Models;

namespace Zavrsni_Trgovina.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KorisnikController : ControllerBase
    {
        /// <summary>
        /// Kontest za rad s bazom koji će biti postavljen s pomoću Dependecy Injection-om
        /// </summary>
        private readonly TrgovinaContext _context;
        /// <summary>
        /// Konstruktor klase koja prima Trgovina kontext
        /// pomoću DI principa
        /// </summary>
        /// <param name="context"></param>
        public KorisnikController(TrgovinaContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Dohvaća sve korisnike iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita
        /// 
        ///    GET api/v1/korisnik
        ///    
        /// </remarks>
        /// <returns>Korisnici u bazi</returns>
        /// <response code="200">Sve OK, ako nema podataka content-length: 0 </response>
        /// <response code="400">Zahtjev nije valjan</response>
        /// <response code="503">Baza na koju se spajam nije dostupna</response>
        [HttpGet]
        public IActionResult Get()
        {
            // kontrola ukoliko upit nije valjan
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var korisnici = _context.Korisnici.ToList();
                if (korisnici == null || korisnici.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(korisnici);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            // kontrola ukoliko upit nije valjan
            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var p = _context.Korisnici.Find(sifra);
                if (p == null)
                {
                    return new EmptyResult();
                }
                return new JsonResult(p);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Dodaje novog korisnika u bazu
        /// </summary>
        /// <remarks>
        ///     POST api/v1/korisnik
        ///     {naziv: "Primjer naziva"}
        /// </remarks>
        /// <param name="korisnici">korisnika za unijeti u JSON formatu</param>
        /// <response code="201">Kreirano</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Baza nedostupna iz razno raznih razloga</response> 
        /// <returns>Korisnik s šifrom koju je dala baza</returns>
        [HttpPost]
        public IActionResult Post(Korisnik korisnici)
        {
            if (!ModelState.IsValid || korisnici == null)
            {
                return BadRequest();
            }
            try
            {
                _context.Korisnici.Add(korisnici);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, korisnici);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Mijenja podatke postojećih Korisnika u bazi
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    PUT api/v1/korisnik/1
        ///
        /// {
        ///  "sifra": 0,
        ///  "korisnickoIme": "Novi naziv",
        ///  "lozinka": 1234,
        /// }
        ///
        /// </remarks>
        /// <param name="sifra">Šifra korisnika koji se mijenja</param>  
        /// <param name="korisnik">korisnik za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od korisnika koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi korisnika kojeg želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response> 
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Korisnik korisnik)
        {
            if (sifra <= 0 || !ModelState.IsValid || korisnik == null)
            {
                return BadRequest();
            }


            try
            {


                var korisnikIzBaze = _context.Korisnici.Find(sifra);

                if (korisnikIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }


                // inače ovo rade mapperi
                // za sada ručno
                korisnikIzBaze.KorisnickoIme = korisnik.KorisnickoIme;
                korisnikIzBaze.Lozinka = korisnik.Lozinka;

                _context.Korisnici.Update(korisnikIzBaze);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, korisnikIzBaze);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }

        /// <summary>
        /// Briše korisnika iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    DELETE api/v1/korisnik/1
        ///    
        /// </remarks>
        /// <param name="sifra">Šifra korisnika koji se briše</param>  
        /// <returns>Odgovor da li je obrisano ili ne</returns>
        /// <response code="200">Sve je u redu, obrisano je u bazi</response>
        /// <response code="204">Nema u bazi korisnika kojeg želimo obrisati</response>
        /// <response code="503">Problem s bazom</response> 
        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest();
            }

            try
            {
                var korisnikIzBaze = _context.Korisnici.Find(sifra);

                if (korisnikIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Korisnici.Remove(korisnikIzBaze); 
                _context.SaveChanges();

                return Ok("Obrisano"); //return new JsonResult(new { poruka = "Obrisano" });// // ovo nije baš najbolja praksa ali da znake kako i to može

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }
    }
}
