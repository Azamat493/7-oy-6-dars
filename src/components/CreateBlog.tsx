import React, { useState } from "react";
import { useCreateBlogMutation } from "../hooks/useQuery/useQueryAction/useQueryAction";
import { PenLine, FileText, AlignLeft, Send } from "lucide-react"; // Ikonkalar uchun

const CreateBlog = () => {
  const { mutate: postBlog, isPending } = useCreateBlogMutation();

  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      content: `<div class="blog-content">${formData.content}</div>`,
    };

    postBlog(payload, {
      onSuccess: () =>
        setFormData({ title: "", short_description: "", content: "" }),
    });
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 bg-white rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-br from-[#46A358] to-[#367c44] p-10 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-extrabold mb-4 leading-tight">
              Yangi maqola ulashing!
            </h2>
            <p className="text-green-100 text-lg">
              O'z tajribangiz va fikrlaringiz bilan hamjamiyatni boyiting.
            </p>
          </div>
          <div className="hidden md:block opacity-20">
            <PenLine size={200} />
          </div>
        </div>

        <div className="md:col-span-2 p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group">
              <label className="flex items-center gap-2 text-gray-600 font-semibold mb-2 group-focus-within:text-[#46A358] transition-colors">
                <FileText size={18} /> Sarlavha
              </label>
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Maqola sarlavhasini yozing..."
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#46A358] focus:bg-white rounded-xl p-4 outline-none transition-all duration-300 shadow-sm"
              />
            </div>

          
            <div className="group">
              <label className="flex items-center gap-2 text-gray-600 font-semibold mb-2 group-focus-within:text-[#46A358] transition-colors">
                <AlignLeft size={18} /> Qisqacha tavsif
              </label>
              <textarea
                required
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                placeholder="Asosiy mazmun haqida 1-2 gap..."
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#46A358] focus:bg-white rounded-xl p-4 outline-none transition-all duration-300 shadow-sm h-24 resize-none"
              />
            </div>

         
            <div className="group">
              <label className="flex items-center gap-2 text-gray-600 font-semibold mb-2 group-focus-within:text-[#46A358] transition-colors">
                <PenLine size={18} /> Maqola matni
              </label>
              <textarea
                required
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Bu yerga maqolaning to'liq mazmunini kiriting..."
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#46A358] focus:bg-white rounded-xl p-4 outline-none transition-all duration-300 shadow-sm h-48 resize-none"
              />
            </div>

     
            <button
              type="submit"
              disabled={isPending}
              className="w-full cursor-pointer flex items-center justify-center gap-3 bg-[#46A358] hover:bg-[#3b8a4a] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-95 disabled:bg-gray-400 disabled:scale-100 mt-4"
            >
              {isPending ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send size={20} />
                  Nashr qilish
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
