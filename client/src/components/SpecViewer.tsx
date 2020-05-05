import ApiSpec from "../model/ApiSpec";
import Notification from "../model/Notification";
import React, {RefObject, useEffect} from "react";
import Words from "./lib/Words";
import ApiEntry from "../model/ApiEntry";
import PathList from "./PathList";
import SchemaList from "./SchemaList";

interface Props {
    selectedApi?: ApiEntry
    apiSpec?: ApiSpec
    alert?: Notification
    isLoading: boolean
    navPath?: string
}

interface Functions {
    fetchSpec: () => void
    resetSpec: () => void
}

/**
 * This is the main component for viewing an API spec
 * @param selectedApi
 * @param apiSpec
 * @param isLoading
 * @param fetchSpec
 * @param resetSpec
 * @param navPath
 * @constructor
 */
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
        // Return only executes when component un-mounts
        return () => {
            resetSpec();
        }
    }, [resetSpec]);

    if (isLoading || !apiSpec || !apiSpec.document) {
        return <></>;
    }

    const document = apiSpec.document;
    const docPaths = document.paths;

    return (
        <div>
            <Words>
                OpenAPI version: {document?.openapi}
            </Words>

            <div ref={resourceSectionRef}>
                <PathList docPaths={docPaths} navPath={navPath}/>
            </div>

            <div ref={objectSectionRef}>
                <SchemaList components={document?.components} navPath={navPath}/>
            </div>
        </div>
    );
};

export default SpecViewer;