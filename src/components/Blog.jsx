import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillSendFill } from "react-icons/bs";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [filePath, setFilePath] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [name, setName] = useState("");
  const [datePublished, setDatePublished] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8002/api/images");
      setPosts(response.data);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setFilePath(e.target.files[0]);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDatePublishedChange = (event) => {
    setDatePublished(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!filePath) {
      setUploadError("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", filePath); // Specify the original file name
    formData.append("title", title);
    formData.append("content", content);
    formData.append("name", name);
    formData.append("datePublished", datePublished);

    try {
      const response = await axios.post(
        "http://localhost:8002/api/upload",
        formData
      );
      console.log(response.data);
      // Reset form fields and fetch updated posts
      setTitle("");
      setContent("");
      setFilePath(null);
      setUploadError("");
      fetchPosts();
    } catch (error) {
      console.log("Error uploading post:", error);
    }
  };

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-4 rounded-lg bg-main mx-10"
        >
          <div className="flex items-center justify-center text-white font-extrabold text-2xl mb-2">
            <BsFillSendFill />
          </div>
          <h5 className="text-white text-center mb-4">Blog Post</h5>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4 text-right text-white">
              <label htmlFor="title" className="text-gray-700 m-2">
                العنوان
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4 text-right text-white">
              <label htmlFor="name" className="text-gray-700">
                اسم الكاتب
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="mb-4 text-right ">
            <label htmlFor="content" className="text-white">
              محتوى النّص
            </label>{" "}
            <textarea
              value={content}
              onChange={handleContentChange}
              className="w-full mt-2 p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4 text-right text-white">
              <label htmlFor="image" className="text-gray-700">
                الصورة
              </label>{" "}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded bg-white"
              />
            </div>
            <div className="mb-4 text-right text-white">
              <label htmlFor="datePublished" className="text-gray-700">
                تاريخ النشر
              </label>{" "}
              <input
                type="date"
                id="datePublished"
                value={datePublished}
                onChange={handleDatePublishedChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />{" "}
            </div>
          </div>
          <div className="text-center">
            {" "}
            <button
              type="submit"
              className="text-main bg-white py-2 px-4 rounded w-[50%]"
            >
              <h1> تأكيد</h1>
            </button>
          </div>
          {uploadError && <p className="text-red-500">{uploadError}</p>}
        </form>
        <div>
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col gap-8 justify-center items-center"
            >
              <h1 className="pt-8 text-left">{post.title}</h1>
              <div className="text-left">
                <h1>{post.name}</h1>
                <h5>{post.datePublished.substring(0, 10)}</h5>
              </div>

              <img
                src={`http://localhost:8002/${post.filePath}`}
                alt={post.title}
                width={240}
              />
              <h2 className="px-8 text-center">{post.content}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blog;
