import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"; // ✅ useNavigate qo'shildi
import { useQueryClient } from "@tanstack/react-query";
import { useQueryHandler } from "../hooks/useQuery/UseQuery";
import {
  FaEye,
  FaRegComment,
  FaRegHeart,
  FaShareAlt,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import { useIncreaseView } from "../hooks/useQuery/useQueryAction/useQueryAction";

// Blog Type
export interface BlogType {
  _id: string;
  title: string;
  short_description: string;
  content: string;
  created_by: string; // User ID
  created_at: string;
  reaction_length: number;
  views?: number;
  likes?: number;
}

// User (Author) Type
export interface AuthorType {
  _id: string;
  name: string;
  surname: string;
  profile_photo?: string;
  username?: string;
  followers?: string[];
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Navigate hookini chaqiramiz
  const queryClient = useQueryClient();
  const { mutate: increaseView } = useIncreaseView();

  const queryKey = `blog-detail-${id}`;

  // 1. Blogni yuklash
  const {
    data: blogData,
    isLoading: isBlogLoading,
    error: blogError,
  } = useQueryHandler({
    url: `user/blog/${id}`,
    pathname: queryKey,
    param: {},
  });

  const blog: BlogType | null = blogData
    ? Array.isArray(blogData)
      ? (blogData[0] as BlogType)
      : (blogData as BlogType)
    : null;

  // 2. User (Author) ma'lumotlarini yuklash
  const { data: authorData, isLoading: isAuthorLoading } = useQueryHandler({
    pathname: `user-info-${blog?.created_by}`,
    url: blog?.created_by ? `user/by_id/${blog.created_by}` : "",
  });

  const author = authorData as AuthorType;

  // View count logikasi
  useEffect(() => {
    if (id) {
      const storageKey = `viewed_blog_${id}`;
      const savedKey = sessionStorage.getItem(storageKey);
      const currentKey = location.key;

      if (savedKey !== currentKey) {
        increaseView(
          { postId: id },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: [queryKey] });
              sessionStorage.setItem(storageKey, currentKey);
            },
          },
        );
      }
    }
  }, [id, location.key, increaseView, queryClient, queryKey]);

  // ✅ Author profiliga o'tish funksiyasi
  const handleAuthorClick = () => {
    if (author && author._id) {
      // Bu yerda routingiz qanday bo'lsa shunga moslang.
      // Masalan: '/profile/:id' yoki '/user/:id'
      navigate(`/user/${author._id}`);
    }
  };

  if (isBlogLoading)
    return (
      <div className="max-w-[1550px] w-[90%] mx-auto px-4 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );

  if (blogError)
    return (
      <div className="text-center p-10 text-red-500">Xatolik yuz berdi</div>
    );

  if (!blog)
    return <div className="text-center p-10 text-gray-600">Blog topilmadi</div>;

  return (
    <div className="max-w-[1550px] w-[90%] m-auto px-4 py-6 sm:px-6 md:px-8 bg-white">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 wrap-break-word">
        {blog.title}
      </h1>

      <div className="flex flex-wrap items-start sm:items-center gap-4 sm:gap-6 text-sm text-gray-500 mb-6 border-b pb-4">
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-[#46A358]" />
          <span className="text-xs sm:text-sm">
            {new Date(blog.created_at).toLocaleDateString()}
          </span>
        </div>

        <div
          className="flex items-center gap-2 group cursor-pointer"
          onClick={handleAuthorClick}
        >
          {isAuthorLoading ? (
            <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
          ) : author ? (
            <>
              {author.profile_photo ? (
                <img
                  src={author.profile_photo}
                  alt={author.name}
                  className="w-6 h-6 rounded-full object-cover group-hover:opacity-80 transition-opacity"
                />
              ) : (
                <FaUser className="text-[#46A358]" />
              )}
              <span className="font-medium text-gray-700 group-hover:text-[#46A358] transition-colors text-xs sm:text-sm break-words">
                By {author.name} {author.surname}
              </span>
              {author.followers && author.followers.length > 0 && (
                <span className="text-xs text-gray-400 ml-2">
                  {author.followers.length} follower
                  {author.followers.length > 1 ? "s" : ""}
                </span>
              )}
            </>
          ) : (
            <span className="text-xs break-words">Unknown Author</span>
          )}
        </div>
      </div>

      {blog.short_description && (
        <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 italic pl-3 sm:pl-4 border-l-4 border-[#46A358] break-words">
          {blog.short_description}
        </p>
      )}

      {blog.content ? (
        <div
          className="prose max-w-full text-gray-700 leading-relaxed mb-8 break-words overflow-x-hidden"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      ) : (
        <p className="text-gray-600 mb-8 text-sm sm:text-base break-words">
          Blog content mavjud emas.
        </p>
      )}

      <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-3 sm:gap-6 text-gray-500 border-t pt-4 text-xs sm:text-sm">
        <div className="flex items-center gap-1 cursor-pointer hover:text-[#46A358] transition-colors">
          <FaEye /> <span>{blog.views ?? 0}</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition-colors">
          <FaRegHeart /> <span>{blog.likes ?? 0}</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition-colors">
          <FaRegComment /> <span>{blog.reaction_length ?? 0}</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-800 transition-colors">
          <FaShareAlt /> <span>Share</span>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
