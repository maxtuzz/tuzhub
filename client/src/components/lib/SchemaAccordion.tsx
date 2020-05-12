import React, {useEffect, useState} from "react";
import {OpenAPIV3} from "openapi-types";
import AccordionHeader from "./AccordionHeader";
import ExpandableContent from "./ExpandableContent";
import PropertyTableContainer from "../../containers/PropertyTableContainer";

interface Props {
    schemaName: string,
    schema: OpenAPIV3.SchemaObject

    // Used to open accordion when nav button for object is pushed
    openWhen: boolean
}

/**
 * Used to display an expandable object schema viewing accordion
 * @param key
 * @param schema
 * @constructor
 */
const SchemaAccordion: React.FC<Props> = ({schemaName, schema, openWhen}) => {
    const [open, setOpened] = useState(false);

    useEffect(() => {
        setOpened(openWhen);
    }, [openWhen]);

    return (
        <div>
            <AccordionHeader open={open} onClick={() => setOpened(!open)}>
                {schemaName}
            </AccordionHeader>
            <ExpandableContent open={open}>
                <PropertyTableContainer schema={schema}/>
                {/*<SyntaxHighlighter language="json" style={monokai} customStyle={{background: 0}}>*/}
                {/*    {*/}
                {/*        JSON.stringify(value, null, 2)*/}
                {/*    }*/}
                {/*</SyntaxHighlighter>*/}
            </ExpandableContent>
        </div>
    );
};

export default SchemaAccordion;