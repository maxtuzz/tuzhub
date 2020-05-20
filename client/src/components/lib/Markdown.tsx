import React, {ReactType} from "react";
import ReactMarkdown from "react-markdown/with-html";
import Words from "./Words";
import listItem from "./ListItem";

interface Renderers {
    [p: string]: ReactType
}

interface Props {
    source: string
}

/**
 * Renders a markdown string as formatted html
 * @param source
 * @constructor
 */
const Markdown: React.FC<Props> = ({source}) => {
    const renderers: Renderers = {
        "paragraph": Words,
        "listItem": listItem
    };

    return (
        <div>
            <ReactMarkdown renderers={renderers} source={source}/>
        </div>
    );
};

export default Markdown;