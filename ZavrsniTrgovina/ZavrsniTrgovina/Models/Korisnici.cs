using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Zavrsni_Trgovina.Models
{
    public class Korisnici : Entitet
    {
        [Required(ErrorMessage = "Sifra obavezno")]
        public int? Sifra { get; set; }

        [Required(ErrorMessage = "Korisnicko Ime obavezno")]
        public string? KorisnickoIme { get; set; }

        [Required(ErrorMessage = "Lozinka obavezno")]
        public string? Lozinka { get; set; }

    }
}
