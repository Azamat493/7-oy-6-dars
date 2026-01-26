import { useNavigate } from "react-router-dom";
import { useQueryHandler } from "../hooks/useQuery/UseQuery";
import { FaEye, FaRegComment, FaRegHeart } from "react-icons/fa";

interface BlogType {
  _id: string;
  title: string;
  short_description: string;
  content: string;
  created_at: string;
  created_by: string;
  views?: number;
  likes?: number;
  comments_count?: number;
}

const BlogSection = () => {
  const navigate = useNavigate();

  const { data: data2, isLoading } = useQueryHandler({
    url: "user/blog",
    pathname: "blog",
    param: { search: "" },
  });

  const skeletonArray = [1, 2, 3, 4, 5, 6]; 

  return (
    <div className="w-[90%] max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {isLoading
          ? skeletonArray.map((_, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm animate-pulse flex flex-col justify-between h-56"
              >
                <div className="h-5 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <div className="h-4 w-12 bg-gray-300 rounded"></div>
                  <div className="h-4 w-12 bg-gray-300 rounded"></div>
                  <div className="h-4 w-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))
          : !data2 || data2.length === 0
          ? <div>Bloglar topilmadi</div>
          : data2.map((blog: BlogType) => (
              <div
                key={blog._id}
                onClick={() => navigate(`/blog/${blog._id}`)}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between h-full"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                    {blog.title || "Sarlavha mavjud emas"}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-4">
                    {blog.short_description || blog.content || "Izoh mavjud emas..."}
                  </p>
                </div>

                <div className="flex items-center justify-between text-gray-400 text-sm mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <FaEye /> <span>{blog.views ?? 0}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <FaRegComment /> <span>{blog.comments_count ?? 0}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <FaRegHeart /> <span>{blog.likes ?? 0}</span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default BlogSection;
