import './about.css';

const About = () => {
    return (
        <section id="about" className="container my-10">
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src="/img/img1.jpg" alt="Album" className="w-72 object-cover" /></figure>
                <div className="card-body">
                    <h2 className="card-title mb-3">Tentang Web</h2>
                    <p>Website ini digunakan untuk aktivitas rutin dan untuk keperluan dokumentasi </p>
                </div>
            </div>
        </section>
    );
}
 
export default About;