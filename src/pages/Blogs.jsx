import BlogCard from '../components/Blog/BlogCard';

const Blogs = ({ blogPosts, onBlogClick }) => {
    return (
        <section id="blogs" className="page-section active">
            <div className="container">
                <h2 className="section-title">
                    <i className="fas fa-blog"></i> Nuestros Blogs
                </h2>
                <div className="blog-grid">
                    {Object.values(blogPosts).map(blog => (
                        <BlogCard
                            key={blog.id}
                            blog={blog}
                            onBlogClick={onBlogClick}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;