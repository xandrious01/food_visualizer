import { Container } from "reactstrap";
import { useParams } from "react-router-dom";
import DisplayFood from "../pages/food/DisplayFood";

const DisplayFoodLayout = () => {
    const {fdcId} = useParams();
    return (
        <Container>
            <h1>
                {fdcId}
            </h1>
            <DisplayFood fdcId={fdcId} />

        </Container>
    )
};

export default DisplayFoodLayout;