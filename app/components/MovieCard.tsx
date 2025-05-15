"use client";
import React from "react";

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-[1.02] transition-all duration-200">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
        <p className="text-gray-500 text-sm mb-2">
          Release Year: {new Date(movie.release_date).getFullYear()}
        </p>
        <p className="text-sm text-gray-700 line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;