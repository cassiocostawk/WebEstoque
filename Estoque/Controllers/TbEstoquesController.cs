using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EstoqueWeb.DAL;
using EstoqueWeb.Models;

namespace EstoqueWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TbEstoquesController : ControllerBase
    {
        private readonly EstoqueDBContext _context;

        public TbEstoquesController(EstoqueDBContext context)
        {
            _context = context;
        }

        // GET: api/TbEstoques
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbEstoque>>> GetTbEstoques()
        {
            return await _context.TbEstoques.ToListAsync();
        }

        // GET: api/TbEstoques/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbEstoque>> GetTbEstoque(int id)
        {
            var tbEstoque = await _context.TbEstoques.FindAsync(id);

            if (tbEstoque == null)
            {
                return NotFound();
            }

            return tbEstoque;
        }

        // PUT: api/TbEstoques/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbEstoque(int id,[FromForm] TbEstoque tbEstoque)
        {
            if (id != tbEstoque.Id)
            {
                return BadRequest();
            }

            _context.Entry(tbEstoque).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbEstoqueExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TbEstoques
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TbEstoque>> PostTbEstoque([FromForm] TbEstoque tbEstoque)
        {
            _context.TbEstoques.Add(tbEstoque);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTbEstoque", new { id = tbEstoque.Id }, tbEstoque);
        }

        // DELETE: api/TbEstoques/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TbEstoque>> DeleteTbEstoque(int id)
        {
            var tbEstoque = await _context.TbEstoques.FindAsync(id);
            if (tbEstoque == null)
            {
                return NotFound();
            }

            _context.TbEstoques.Remove(tbEstoque);
            await _context.SaveChangesAsync();

            return tbEstoque;
        }

        private bool TbEstoqueExists(int id)
        {
            return _context.TbEstoques.Any(e => e.Id == id);
        }
    }
}
