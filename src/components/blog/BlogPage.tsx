import React, { useState } from 'react';
import { Image } from 'astro:assets';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

interface BlogPageProps {
  posts: BlogPost[];
  postsPerPage?: number;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  posts,
  postsPerPage = 3
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular número total de páginas
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Obtener posts de la página actual
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  // Manejar cambio de página
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll al inicio de la página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Featured Post - siempre muestra el primer post */}
      <article className="bg-white rounded-lg shadow-sm overflow-hidden mb-12 lg:flex">
        <img
          src={posts[0].image}
          alt={posts[0].title}
          className="w-full lg:w-1/2 h-96 object-cover"
        />
        <div className="p-8 lg:w-1/2 flex flex-col justify-center">
          <div className="flex gap-4 mb-4">
            <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
              {posts[0].category}
            </span>
            <span className="text-sm text-neutral-600">{posts[0].date}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{posts[0].title}</h2>
          <p className="text-neutral-700 mb-6">{posts[0].excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">Por {posts[0].author}</span>
            <a
              href={`/blog/${posts[0].slug}`}
              className="bg-primary-600 text-white px-6 py-2 rounded font-semibold hover:bg-primary-700 transition-colors"
            >
              Leer Más
            </a>
          </div>
        </div>
      </article>

      {/* Other Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {currentPosts.slice(1).map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-xs text-neutral-600">{post.date}</span>
              </div>
              <h3 className="text-lg font-bold mb-3 line-clamp-2">{post.title}</h3>
              <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">{post.author}</span>
                <a
                  href={`/blog/${post.slug}`}
                  className="border border-primary-600 text-primary-600 px-4 py-2 rounded hover:bg-primary-50 transition-colors"
                >
                  Leer
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {/* Botón Anterior */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-neutral-300 rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Anterior
          </button>

          {/* Números de página */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded font-semibold transition-colors ${
                currentPage === page
                  ? 'bg-primary-600 text-white'
                  : 'border border-neutral-300 hover:bg-neutral-100'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Botón Siguiente */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-neutral-300 rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
};
