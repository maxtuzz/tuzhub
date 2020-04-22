import ApiSpec from "../model/ApiSpec";
import Alert from "../model/Alert";
import React, {RefObject, useEffect} from "react";
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
    fetchSpec: () => void
    resetSpec: () => void
}

const SpecViewer: React.FC<Props & Functions> = ({selectedApi, apiSpec, isLoading, fetchSpec, resetSpec, navPath}) => {
    const resourceSectionRef: RefObject<any> = React.createRef();
    const objectSectionRef: RefObject<any> = React.createRef();

    const scrollTo = (ref: RefObject<any>) => {
        ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    useEffect(() => {
        if (navPath === "resources") {
            scrollTo(resourceSectionRef);
        }

        if (navPath === "objects") {
            scrollTo(objectSectionRef)
        }
    }, [navPath, resourceSectionRef, objectSectionRef]);

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

            <div ref={resourceSectionRef}>
                <PathList docPaths={docPaths} navPath={navPath}/>
            </div>

            <div ref={objectSectionRef}>
                <ObjectList components={apiSpec?.document?.components} navPath={navPath}/>
            </div>
        </div>
    );
};

export default SpecViewer;