using Microsoft.EntityFrameworkCore;
using Zavrsni_Trgovina.Models;

namespace Zavrsni_Trgovina.Data
{
    /// <summary>
    /// Ovo mi je datoteka gdje ću navoditi datasetove i načine spajanja u bazi
    /// </summary>
    public class TrgovinaContext : DbContext
    {
        /// <summary>
        /// Kostruktor
        /// </summary>
        /// <param name="options"></param>
        public TrgovinaContext(DbContextOptions<TrgovinaContext> options)
            : base(options)
        {

        }
        /// <summary>
        /// Korisnici u bazi
        /// </summary>
        public DbSet<Korisnik> Korisnici { get; set; }
    }
}
