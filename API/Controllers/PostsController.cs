using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Posts;

namespace API.Controllers
{
    public class PostsController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Post>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetIndividualPost(Guid id)
        {
            return await Mediator.Send(new IndividualPost.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost(Post post)
        {
            return Ok(await Mediator.Send(new Create.Command { Post = post }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPost(Guid id, Post post)
        {
            post.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Post = post }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}