using System.ComponentModel.DataAnnotations;

namespace Zavrsni_Trgovina.Models
{
    public class Korisnik : Entitet
    {
        /// <summary>
        ///Korisnicko ime  u bazi
        /// </summary>
        [Required(ErrorMessage = "Korisnicko Ime obavezno")]
        public string? KorisnickoIme { get; set; }

        /// <summary>
        /// Lozinka u bazi
        /// </summary>
        [Required(ErrorMessage = "Lozinka obavezno")]
        public string? Lozinka { get; set; }

    }
}
