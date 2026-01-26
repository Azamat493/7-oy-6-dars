import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaRegComment, FaRegHeart, FaSearch } from "react-icons/fa";
import { useQueryHandler } from "../hooks/useQuery/UseQuery";
import { useReduxSelector } from "../hooks/useRedux/useRedux";

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

const BlogSectionInfo = () => {
  const navigate = useNavigate();
  const user = useReduxSelector((state: any) => state.userSlice.user);

  const skeletonArray = [1, 2, 3, 4, 5, 6];

  const [searchTerm, setSearchTerm] = useState("");
  const [allBlogs, setAllBlogs] = useState<BlogType[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const { data: apiData = [], isLoading: apiLoading } = useQueryHandler({
    url: "user/blog",
    pathname: "blog",
    param: { search: "" },
  });

  useEffect(() => {
    if (apiData.length > 0) {
      setAllBlogs(apiData);
      localStorage.setItem("blogs_cache", JSON.stringify(apiData));
      setFilteredBlogs(apiData);
    } else {
      const stored = localStorage.getItem("blogs_cache");
      if (stored) {
        const parsed: BlogType[] = JSON.parse(stored);
        setAllBlogs(parsed);
        setFilteredBlogs(parsed);
      }
    }
  }, [apiData]);

  const handleSearch = () => {
    setIsSearching(true);
    setFilteredBlogs([]);

    setTimeout(() => {
      const term = searchTerm.toLowerCase().trim();
      if (!term) {
        setFilteredBlogs(allBlogs);
      } else {
        const filtered = allBlogs.filter(
          (blog) =>
            blog.title?.toLowerCase().includes(term) ||
            blog.short_description?.toLowerCase().includes(term) ||
            blog.content?.toLowerCase().includes(term),
        );
        setFilteredBlogs(filtered);
      }
      setIsSearching(false);
    }, 2000);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setIsSearching(true);
      setFilteredBlogs([]);
      setTimeout(() => {
        setFilteredBlogs(allBlogs);
        setIsSearching(false);
      }, 1000);
    }
  }, [searchTerm, allBlogs]);

  return (
    <div className="w-[90%] max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {user && (
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-lg flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200 shadow-sm">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 transition-all text-sm sm:text-base"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-[#46a358] cursor-pointer hover:bg-[#3d8f4d] text-white font-medium py-2.5 px-6 rounded-md transition-colors duration-300 flex items-center gap-2 shadow-md shadow-green-500/20 active:scale-95"
            >
              Search
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isSearching || (apiLoading && allBlogs.length === 0) ? (
          skeletonArray.map((_, idx) => (
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
        ) : filteredBlogs.length === 0 ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10">
            <p className="text-gray-500 text-lg">
              {searchTerm
                ? `"${searchTerm}" bo'yicha hech narsa topilmadi.`
                : "Hozircha bloglar mavjud emas."}
            </p>
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              onClick={() => navigate(`/blog/${blog._id}`)}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between h-full group"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-4">
                  {blog.short_description || blog.content}
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
          ))
        )}
      </div>
    </div>
  );
};

export default BlogSectionInfo;
