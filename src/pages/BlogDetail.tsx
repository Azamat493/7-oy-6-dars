import React from "react";
import { useParams } from "react-router-dom";
import { useQueryHandler } from "../hooks/useQuery/UseQuery";
import { FaEye, FaRegComment, FaRegHeart, FaShareAlt } from "react-icons/fa";

export interface BlogType {
  _id: string;
  title: string;
  short_description: string;
  content: string;
  created_by: string;
  created_at: string;
  reaction_length: number;
  views?: number;
  likes?: number;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: blogData, isLoading, error } = useQueryHandler({
    url: `user/blog/${id}`,
    pathname: `blog-detail-${id}`,
    param: {},
  });

  if (isLoading)
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
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          
          <div className="flex items-center gap-4 mt-6">
            <div className="h-6 w-16 bg-gray-300 rounded"></div>
            <div className="h-6 w-16 bg-gray-300 rounded"></div>
            <div className="h-6 w-16 bg-gray-300 rounded"></div>
            <div className="h-6 w-16 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center p-10 text-red-500">Xatolik yuz berdi</div>
    );
  if (!blogData)
    return (
      <div className="text-center p-10 text-gray-600">Blog topilmadi</div>
    );

  const blog = Array.isArray(blogData)
    ? (blogData[0] as BlogType)
    : (blogData as BlogType);

  return (
    <div className="max-w-[1550px] w-[90%] mx-auto px-4 py-10 bg-white">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        {blog.title}
      </h1>

      {blog.short_description && (
        <p className="text-gray-600 text-base md:text-lg mb-4">
          {blog.short_description}
        </p>
      )}

      {blog.content ? (
        <div
          className="prose max-w-none text-gray-700 leading-relaxed mb-8"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      ) : (
        <p className="text-gray-600 mb-8">Blog content mavjud emas.</p>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-gray-500 border-t pt-4">
        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
          <FaEye /> <span>{blog.views ?? 0}</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
          <FaRegHeart /> <span>{blog.likes ?? 0}</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
          <FaRegComment /> <span>{blog.reaction_length ?? 0}</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
          <FaShareAlt /> <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
