import React from "react";
import Ch9JE0GV from "../assets/images/1-Ch9JE0GV.png";
import BqD2fIC7 from "../assets/images/2-BqD2fIC7.png";
import Bg8f3bcT from "../assets/images/3-Bg8f3bcT.png";
import CGk6D0183277n from "../assets/images/4-CGk6Ds5n.png";

interface BlogPost {
  id: number;
  imageUrl: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    imageUrl: Ch9JE0GV,
    date: "September 12",
    readTime: "Read in 6 minutes",
    title: "Cactus & Succulent Care Tips",
    description:
      "Cacti are succulents are easy care plants for any home or patio.",
  },
  {
    id: 2,
    imageUrl: BqD2fIC7,
    date: "September 13",
    readTime: "Read in 2 minutes",
    title: "Top 10 Succulents for Your Home",
    description: "Best in hanging baskets. Prefers medium to high light.",
  },
  {
    id: 3,
    imageUrl: Bg8f3bcT,
    date: "September 15",
    readTime: "Read in 3 minutes",
    title: "Cacti & Succulent Care Tips",
    description:
      "Cacti and succulents thrive in containers and because most are.",
  },
  {
    id: 4,
    imageUrl: CGk6D0183277n,
    date: "September 12",
    readTime: "Read in 6 minutes",
    title: "Best Houseplants Room by Room",
    description: "The benefits of houseplants are endless. In addition to..",
  },
];

const BlogSection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Our Blog Posts
          </h2>
          <p className="text-gray-500 font-normal">
            We are an online plant shop offering a wide range of cheap and
            trendy plants.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="group flex flex-col">
              <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100 h-56 w-full">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="text-green-600 text-sm font-medium mb-2 flex items-center">
                <span>{post.date}</span>
                <span className="mx-1.5 text-green-600">|</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                {post.title}
              </h3>

              <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                {post.description}
              </p>

              <a
                href="#"
                className="inline-flex items-center text-gray-900 font-bold text-sm hover:text-green-600 transition-colors mt-auto group/link"
              >
                Read More
                <svg
                  className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
