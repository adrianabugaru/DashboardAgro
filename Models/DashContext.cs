using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace DashboardAgro.Models
{
    public class DashContext : IdentityDbContext<IdentityUser>
    {

        public DashContext(DbContextOptions<DashContext> options)
            : base(options)
        { }

        public DbSet<Board> Boards { get; set; }
        public DbSet<NewsArticle> NewsArticles { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<MapPoint> MapPoints { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MapPoint>().Property(a => a.Latitude).HasPrecision(18, 9);
            modelBuilder.Entity<MapPoint>().Property(a => a.Longitude).HasPrecision(18, 9);
        }
    }
}
