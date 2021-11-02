export default function NotFound(props) {

    const handleGoHome = () => {
        props.history.push("/");
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="text-center hero-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">
                        404 page not found
                    </h1>
                    <p className="mb-5">
                        We are sorry but the page you are looking for does not exist.
                    </p>
                    <button onClick={handleGoHome} className="btn btn-primary">Go Home</button>
                </div>
            </div>
        </div>
    )
}