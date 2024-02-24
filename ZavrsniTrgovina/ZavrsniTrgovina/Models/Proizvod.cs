using System.ComponentModel.DataAnnotations;

namespace Zavrsni_Trgovina.Models
{
    public class Proizvod : Entitet
    {
        [Required(ErrorMessage = "Šifra obavezna")]
        public int? Šifra { get; set; }

        [Required(ErrorMessage = "Naziv obavezno")]
        public string? Naziv { get; set; }

        public string? Cijena { get; set; }
    }
}