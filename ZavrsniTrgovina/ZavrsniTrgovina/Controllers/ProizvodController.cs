using Microsoft.AspNetCore.Mvc;
using Zavrsni_Trgovina.Data;
using Zavrsni_Trgovina.Models;

namespace Zavrsni_Trgovina.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProizvodController : ControllerBase
    {

            private readonly TrgovinaContext _context;

            public ProizvodController(TrgovinaContext context)
            {
                _context = context;
            }


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
                    var lista = _context.Proizvodi.ToList();
                    if (lista == null || lista.Count == 0)
                    {
                        return new EmptyResult();
                    }
                    return new JsonResult(lista);
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
                    var p = _context.Proizvodi.Find(sifra);
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


            [HttpPost]
            public IActionResult Post(Proizvod entitet)
            {
                if (!ModelState.IsValid || entitet == null)
                {
                    return BadRequest();
                }
                try
                {
                    _context.Proizvodi.Add(entitet);
                    _context.SaveChanges();
                    return StatusCode(StatusCodes.Status201Created, entitet);
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status503ServiceUnavailable,
                        ex.Message);
                }
            }


            [HttpPut]
            [Route("{sifra:int}")]
            public IActionResult Put(int sifra, Proizvod entitet)
            {
                if (sifra <= 0 || !ModelState.IsValid || entitet == null)
                {
                    return BadRequest();
                }


                try
                {


                    var entitetIzBaze = _context.Proizvodi.Find(sifra);

                    if (entitetIzBaze == null)
                    {
                        return StatusCode(StatusCodes.Status204NoContent, sifra);
                    }


                    // inače ovo rade mapperi
                    // za sada ručno
                    entitetIzBaze.Naziv = entitet.Naziv;
                    entitetIzBaze.Cijena = entitet.Cijena;

                    _context.Proizvodi.Update(entitetIzBaze);
                    _context.SaveChanges();

                    return StatusCode(StatusCodes.Status200OK, entitetIzBaze);
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status503ServiceUnavailable,
                        ex.Message);
                }

            }


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
                    var entitetIzbaze = _context.Proizvodi.Find(sifra);

                    if (entitetIzbaze == null)
                    {
                        return StatusCode(StatusCodes.Status204NoContent, sifra);
                    }

                    _context.Proizvodi.Remove(entitetIzbaze);
                    _context.SaveChanges();

                return Ok("Obrisano"); // ovo nije baš najbolja praksa ali da znate kako i to može

            }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status503ServiceUnavailable,
                        ex.Message);
                }

            }



        }
    }