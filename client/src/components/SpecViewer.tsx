import ApiSpec from "../model/ApiSpec";
import Alert from "../model/Alert";
import React, {useEffect} from "react";
import Words from "./lib/Words";
import ApiEntry from "../model/ApiEntry";
import HeaderText from "./lib/HeaderText";
import PathList from "./PathList";

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

    if (isLoading || !apiSpec || !apiSpec.document) {
        return <Words>Loading specification ...</Words>
    }

    // let objects: Array<JSX.Element> = [];

    const components = apiSpec.document.components;

    const docPaths = apiSpec.document.paths;
    // for (let key in schemas) {
    //     objects.push(
    //         <div>
    //             <Words>{key}</Words>
    //             <code>{JSON.stringify(schemas[key])}</code>
    //         </div>
    //     )
    // }

    return (
        <div>
            <Words>
                OpenAPI version: {apiSpec?.document?.openapi}
            </Words>

            <PathList docPaths={docPaths}/>

            <HeaderText>Objects</HeaderText>
            {/*{objects}*/}

            <HeaderText>BaseUrl</HeaderText>
            {apiSpec?.document?.servers?.map((server, index) => <Words key={index}>{server.url}</Words>)}
            <code>{JSON.stringify(components?.schemas, null, 4)}</code>
        </div>
    );
};

export default SpecViewer;