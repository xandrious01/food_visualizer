import { useContext } from "react";
import { NetworkErrorContext } from "../contexts";

const ErrorLoadingMsg = () => {
    const {errorLoading} = useContext(NetworkErrorContext);
    const style = {"color" : 'red'}
    if(errorLoading){
        return (
            <div>
                <p style={style}>
                    Unable to load page due to {''+errorLoading.toLowerCase()}.
                </p>
            </div>
        )
    }
}

export default ErrorLoadingMsg;