using System.ComponentModel.DataAnnotations;

namespace Zavrsni_Trgovina.Models
{
    public class Proizvod : Entitet
    {
        /// <summary>
        ///Naziv u bazi
        /// </summary>
        [Required(ErrorMessage = "Naziv obavezno")]
        public string? Naziv { get; set; }

        /// <summary>
        ///Cijena u bazi
        /// </summary>
        [Required(ErrorMessage = "Cijena obavezno")]
        public decimal? Cijena { get; set; }
    }
}
