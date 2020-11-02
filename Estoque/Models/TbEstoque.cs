using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace EstoqueWeb.Models {

     public class TbEstoque {

        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string NomeProduto { get; set; }

        public double Quantidade { get; set; }

        public double ValorUnitario { get; set; }
    }
}
