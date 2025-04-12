using Microsoft.EntityFrameworkCore;
using Open_Book.Db.Entities;
using Open_Book.Services;
using System.Reflection;

namespace Open_Book.Db
{
    public class AppDbContext : DbContext
    {
        private readonly ICurrentUserService? _currentUserService;
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options, ICurrentUserService currentUserService) : base(options)
        {
            _currentUserService = currentUserService;
        }


        public DbSet<BookData> BookData { get; set; } = null!;
        public DbSet<BookDetails> BookDetails { get; set; } = null!;
        public DbSet<BookAuthor> BookAuthors { get; set; } = null!;
        public DbSet<Tags> Tags { get; set; } = null!;
        public DbSet<BookTags> BookTags { get; set; } = null!;
        public DbSet<User> User { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                if (typeof(BaseAuditTrail).IsAssignableFrom(entityType.ClrType))
                {
                    var method = typeof(AppDbContext)
                        .GetMethod(nameof(SetSoftDeleteFilter), BindingFlags.NonPublic | BindingFlags.Static)!
                        .MakeGenericMethod(entityType.ClrType);

                    method.Invoke(null, new object[] { modelBuilder });
                }
            }

            modelBuilder.Entity<BookData>()
                .HasOne(b => b.Details)
                .WithOne(d => d.BookData)
                .HasForeignKey<BookDetails>(d => d.BookDataId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<BookTags>()
                .HasKey(bt => new { bt.BookDataId, bt.TagId });

            modelBuilder.Entity<BookTags>()
                .HasOne(bt => bt.BookData)
                .WithMany(b => b.BookTags)
                .HasForeignKey(bt => bt.BookDataId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<BookTags>()
                .HasOne(bt => bt.Tag)
                .WithMany(t => t.BookTags)
                .HasForeignKey(bt => bt.TagId)
                .OnDelete(DeleteBehavior.NoAction);
        }

        public void DetachAllEntities()
        {
            var changedEntriesCopy = this.ChangeTracker.Entries()
                    .Where(e => e.State == EntityState.Added ||
                                e.State == EntityState.Modified ||
                                e.State == EntityState.Deleted)
                    .ToList();

            foreach (var entry in changedEntriesCopy)
                entry.State = EntityState.Detached;
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.Entity is BaseAuditTrail && (
                    e.State == EntityState.Added ||
                    e.State == EntityState.Modified ||
                    e.State == EntityState.Deleted));

            foreach (var entry in entries)
            {
                var entity = (BaseAuditTrail)entry.Entity;

                var now = DateTime.UtcNow;
                // var currentUser = _currentUserService?.GetUserId();
                var currentUser = "System";

                switch (entry.State)
                {
                    case EntityState.Added:
                        entity.CreatedAt = now;
                        entity.CreatedBy = currentUser;
                        break;

                    case EntityState.Modified:
                        entity.UpdatedAt = now;
                        entity.UpdatedBy = currentUser;
                        break;

                    case EntityState.Deleted:
                        entity.DeletedAt = now;
                        entity.DeletedBy = currentUser;
                        entry.State = EntityState.Modified;
                        break;
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }

        private static void SetSoftDeleteFilter<TEntity>(ModelBuilder builder) where TEntity : BaseAuditTrail
        {
            builder.Entity<TEntity>().HasQueryFilter(e => e.DeletedAt == null);
        }
    }
}
