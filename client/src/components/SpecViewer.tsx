import ApiSpec from "../model/ApiSpec";
import Alert from "../model/Alert";
import React, {useEffect} from "react";
import Words from "./lib/Words";
import ApiEntry from "../model/ApiEntry";
import PathList from "./PathList";
import ObjectList from "../ObjectList";

interface Props {
    selectedApi?: ApiEntry
    apiSpec?: ApiSpec
    alert?: Alert
    isLoading: boolean
    navPath?: string
}

interface Functions {
    fetchSpec: () => any
    resetSpec: () => any
}

const SpecViewer: React.FC<Props & Functions> = ({selectedApi, apiSpec, isLoading, fetchSpec, resetSpec, navPath}) => {
    useEffect(() => {
        if (selectedApi) {
            fetchSpec()
        }
    }, [selectedApi, fetchSpec]);

    // Component un-mounts
    useEffect(() => {
        return () => {
            resetSpec();
        }
    }, [resetSpec]);

    if (isLoading || !apiSpec || !apiSpec.document) {
        return <Words>Loading specification ...</Words>
    }

    const docPaths = apiSpec.document.paths;

    return (
        <div>
            <Words>
                OpenAPI version: {apiSpec?.document?.openapi}
            </Words>

            <PathList docPaths={docPaths} navPath={navPath}/>

            <ObjectList components={apiSpec?.document?.components}/>
        </div>
    );
};

export default SpecViewer;