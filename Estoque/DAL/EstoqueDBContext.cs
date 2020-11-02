using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using EstoqueWeb.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace EstoqueWeb.DAL {
    public class EstoqueDBContext : DbContext {

        public DbSet<TbEstoque> TbEstoques { get; set; }

        public EstoqueDBContext() : base() {

        }

        public EstoqueDBContext(DbContextOptions options) : base(options) {

        }

        /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            string stringConexao = ConfigurationManager.ConnectionStrings[0].ConnectionString;
            optionsBuilder.UseSqlite(stringConexao);
            base.OnConfiguring(optionsBuilder);
        }*/

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<TbEstoque>();
            base.OnModelCreating(modelBuilder);
        }
    }
}
