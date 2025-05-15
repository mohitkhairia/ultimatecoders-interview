"use client";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filtered, setFiltered] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isGlobalSearch, setIsGlobalSearch] = useState(false);

  const fetchMovies = async (pageNumber: number) => {
    setLoading(true);
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${pageNumber}`
    );
    const data = await res.json();

    if (data.results.length === 0) setHasMore(false);

    setMovies((prev) => [...prev, ...data.results]);
    setFiltered((prev) => [...prev, ...data.results]);
    setLoading(false);
  };

  const fetchSearchResults = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setIsGlobalSearch(true);
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(search)}&language=en-US&page=1&include_adult=false`
    );
    const data = await res.json();
    setFiltered(data.results);
    setLoading(false);
  };

  useEffect(() => {
    if (!isGlobalSearch) {
      fetchMovies(page);
    }
  }, [page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (!isGlobalSearch) {
      setFiltered(
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const resetToDefault = () => {
    setIsGlobalSearch(false);
    setFiltered(movies.filter((m) => m.title.toLowerCase().includes(search.toLowerCase())));
  };

  const handleSearchClick = () => {
    if (search.trim()) {
      fetchSearchResults();
    } else {
      resetToDefault();
    }
  };

  const loadMore = () => {
    if (hasMore && !loading && !isGlobalSearch) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Popular Movies</h1>

      <div className="max-w-xl mx-auto flex gap-2 mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by title..."
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearchClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {!isGlobalSearch && hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;