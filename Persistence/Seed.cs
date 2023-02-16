using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Posts.Any()) return;

            var posts = new List<Post>
            {
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "First Post",
                    Content = "This is the content of the first post",
                    Date = DateTime.Now,
                    Summary = "This is the summary of the first post",
                    Category = "Category 1"
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Second Post",
                    Content = "This is the content of the second post",
                    Date = DateTime.Now,
                    Summary = "This is the summary of the second post",
                    Category = "Category 2"
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Third Post",
                    Content = "This is the content of the third post",
                    Date = DateTime.Now,
                    Summary = "This is the summary of the third post",
                    Category = "Category 3"
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Fourth Post",
                    Content = "This is the content of the fourth post",
                    Date = DateTime.Now,
                    Summary = "This is the summary of the fourth post",
                    Category = "Category 4"
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Fifth Post",
                    Content = "This is the content of the fifth post",
                    Date = DateTime.Now,
                    Summary = "This is the summary of the fifth post",
                    Category = "Category 5"
                },
            };

            await context.Posts.AddRangeAsync(posts);
            await context.SaveChangesAsync();
        }
    }
}