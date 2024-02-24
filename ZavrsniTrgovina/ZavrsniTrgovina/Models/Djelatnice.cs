using System.ComponentModel.DataAnnotations;

namespace Zavrsni_Trgovina.Models
{
    public class Djelatnice : Entitet
    {
        [Required(ErrorMessage = "Šifra obavezna")]
        public int? Sifra { get; set; }

        [Required(ErrorMessage = "Ime obavezno")]
        public string? Ime { get; set; }

        [Required(ErrorMessage = "Prezime obavezno")]
        public string? Prezime { get; set; }
    }
}
