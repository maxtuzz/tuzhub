import React, {useState} from "react";
import {OpenAPIV3} from "openapi-types";
import FieldTable from "./lib/FieldTable";
import BodyView from "./lib/BodyView";
import AccordionHeader from "./lib/AccordionHeader";
import ExpandableContent from "./lib/ExpandableContent";

interface Props {
    parameters: Array<OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject>;
    noTopMargin?: boolean
}

/**
 * Higher order component that handles showing/hiding field view
 * @param parameters
 * @param noTopMargin
 * @constructor
 */
const FieldView: React.FC<Props> = ({parameters, noTopMargin = false}) => {
    const [open, setOpen] = useState(true);

    return (
        <BodyView>
            <AccordionHeader open={open}
                             noTopMargin={noTopMargin}
                             onClick={() => setOpen(!open)}
                             labeledChevron>
                Field Parameters
            </AccordionHeader>
            <ExpandableContent open={open}>
                <FieldTable parameters={parameters}/>
            </ExpandableContent>
        </BodyView>
    );
};

export default FieldView;