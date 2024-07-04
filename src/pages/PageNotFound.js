import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const PageNotFound = () => {
    return (
        <div className="notFoundDiv">
            <p className="notFoundText">
                Page Not Found
            </p>
            <Link to="/">
                <Button className="custom-button">
                    Back Home
                </Button>
            </Link>
        </div>
    )
}

export default PageNotFound;