export default function HomePage(props) {

    const handleGetStarted = () => {
        props.history.push("/login");
    };

    return (
        <>
            <div className="hero min-h-screen bg-hero-pattern">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="text-center hero-content text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">
                            BOM App
                        </h1>
                        <p className="mb-5">
                            A bill of materials (BOM) is a structured list identifying all materials and components required to construct a product, as well as the instructions for procuring and using the materials.
                        </p>
                        <button onClick={handleGetStarted} className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </>
    );
}