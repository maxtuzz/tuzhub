import React, {useEffect, useState} from "react";
import {OpenAPIV3} from "openapi-types";
import AccordionHeader from "./AccordionHeader";
import ExpandableContent from "./ExpandableContent";
import SyntaxHighlighter from "react-syntax-highlighter";
import {monokai} from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface Props {
    schemaName: string,
    schema: OpenAPIV3.ArraySchemaObject | OpenAPIV3.NonArraySchemaObject

    // Used to open accordion when nav button for object is pushed
    openWhen: boolean
}

/**
 * Used to display an expandable object schema viewing accordion
 * @param key
 * @param schema
 * @constructor
 */
const ObjectAccordion: React.FC<Props> = ({schemaName, schema, openWhen}) => {
    const [open, setOpened] = useState(false);

    useEffect(() => {
        setOpened(openWhen);
    }, [openWhen]);

    const value = schema.properties;

    if (!value) {
        return <></>
    }

    return (
        <div>
            <AccordionHeader open={open} onClick={() => setOpened(!open)}>
                {schemaName}
            </AccordionHeader>
            <ExpandableContent open={open}>
                <SyntaxHighlighter language="json" style={monokai}>
                    {
                        JSON.stringify(value, null, 2)
                    }
                </SyntaxHighlighter>
            </ExpandableContent>
        </div>
    );
};

export default ObjectAccordion;