import React, { useEffect, useRef, useState } from "react";
import { Header, TopButton, Footer } from "../../components";
import { BlogSection } from "../../containers";
import { blogSection } from "../../portfolio";
import BlogCard from "../../components/blogCard/BlogCard";
import Fade from "react-reveal/Fade";
import "./Blog.css";

const Blog = (props) => {
  const { theme } = props;
  const blogRef = useRef(null);
  const [blogData, setBlogData] = useState(null);
  const [dataUnavailable, setDataUnavailable] = useState(false); 

  useEffect(() => {
    try {
      const data = require("../../assets/blogData/869945985_images.json");
      setBlogData(data);
    } catch (error) {
      console.error("Error loading blog data:", error);
      setDataUnavailable(true); 
    }
  }, []);

  const cleanEmptyNodes = () => {
    if (blogRef.current) {
      const emptyNodes = [...blogRef.current.childNodes].filter((child) => !child.children.length);
      emptyNodes.forEach((child) => blogRef.current.removeChild(child));
    }
  };

  useEffect(() => {
    cleanEmptyNodes();
  }, []);

  // Перевірка на тип блогів
  const blogType = blogSection.display;
  if (!["none", "myBlog", "hardcoded"].includes(blogType) || blogType === "none") {
    return null;
  }

  const renderBlogCards = () => {
    return blogData.map((blog) => (
      <BlogCard
        key={blog.chatId}
        theme={theme}
        blog={{
          fileName: blog.fileName,
          title: blog.title,
          description: blog.description,
          image: blog.pictureName,
        }}
      />
    ));
  };

  return (
    <div className="main-page">
      <Header theme={theme} />
      <Fade bottom duration={1000} distance="20px">
        <div className="main" id="blogs">
          <BlogSection theme={theme} />
          <div className="blog-main-div">
            <div className="blog-text-div" ref={blogRef}>
              {dataUnavailable ? (
                <div>Даних про блог, поки не має</div> // Message when data is unavailable
              ) : (
                blogData && renderBlogCards() // Render blog cards if data is available
              )}
            </div>
          </div>
        </div>
      </Fade>
      <TopButton theme={theme} />
      <Footer theme={theme} onToggle={props.onToggle} />
    </div>
  );
};

export default Blog;
