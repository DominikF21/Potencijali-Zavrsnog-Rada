using System.ComponentModel.DataAnnotations;

namespace Zavrsni_Trgovina.Models
{
    public abstract class Entitet
    {
        [Key]
        public int Sifra { get; set; }
    }
}
