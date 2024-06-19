import { Container, List, ListGroup, ListGroupItem} from "reactstrap";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";



const SavedFoods = () => {
    return (
        <div><h1>SavedFoods</h1></div>
    )
    // const savedFoods = getSaved(savedFoods);

    // if (!savedFoods) {
    //     return (
    //         <div>
    //             <h3>You have not saved any foods yet.</h3>
    //         </div>
    //     )
    // }
    // else if (savedFoods) {
    //     return(
    //         <div>
    //             <ListGroup>
    //             {savedFoods.map(i => {
    //                 return (
    //                 <ListGroupItem
    //                     key={i}
    //                 >
    //                     <Link to={`/`}>
    //                        {i} 
    //                     </Link>
                    
    //                 </ListGroupItem>)
    //             })}
    //             </ListGroup>
    //         </div>
    //     )
    // }
}


export default SavedFoods;