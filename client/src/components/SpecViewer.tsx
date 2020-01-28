import ApiSpec from "../model/ApiSpec";
import Alert from "../model/Alert";
import React, {useEffect} from "react";
import Words from "./lib/Words";
import ApiEntry from "../model/ApiEntry";

interface Props {
    selectedApi?: ApiEntry
    apiSpec?: ApiSpec
    alert?: Alert
    isLoading: boolean
}

interface Functions {
    fetchSpec: () => any
}

const SpecViewer: React.FC<Props & Functions> = ({selectedApi, apiSpec, isLoading, fetchSpec}) => {
    useEffect(() => {
        if (selectedApi) {
            fetchSpec()
        }
    }, [selectedApi, fetchSpec]);

    if (isLoading) {
        return <Words>Loading specification ...</Words>
    }

    return (
        <div>
            <Words>{JSON.stringify(apiSpec?.spec)}</Words>
        </div>
    );
};

export default SpecViewer;