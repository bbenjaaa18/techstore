const BlogDetail = ({ blog, onBackClick }) => {
    if (!blog) return null;

    return (
        <section id="detalle-blog" className="page-section active">
            <div className="container">
                <button className="btn btn-outline" onClick={onBackClick}>
                    <i className="fas fa-arrow-left"></i> Volver a Blogs
                </button>
                
                <div className="blog-detail">
                    <article style={{ maxWidth: '800px', margin: '20px auto' }}>
                        <img 
                            src={blog.image} 
                            alt={blog.title} 
                            style={{ 
                                width: '100%', 
                                height: '300px', 
                                objectFit: 'cover', 
                                borderRadius: '12px', 
                                marginBottom: '20px' 
                            }} 
                        />
                        <h1 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>
                            {blog.title}
                        </h1>
                        <div 
                            className="blog-meta" 
                            style={{ 
                                marginBottom: '30px', 
                                paddingBottom: '15px', 
                                borderBottom: '2px solid var(--border-color)' 
                            }}
                        >
                            <span><i className="far fa-calendar"></i> {blog.date}</span>
                            <span style={{ marginLeft: '20px' }}>
                                <i className="far fa-user"></i> {blog.author}
                            </span>
                        </div>
                        <div 
                            className="blog-content" 
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </article>
                </div>
            </div>
        </section>
    );
};

export default BlogDetail;