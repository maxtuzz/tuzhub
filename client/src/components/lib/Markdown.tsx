import React, {ReactType} from "react";
import ReactMarkdown from "react-markdown/with-html";
import Words from "./Words";
import ListItem from "./ListItem";
import Href from "./Href";
import Table, {TableData, TableHeader, TableRow} from "./Table";

interface Renderers {
    [p: string]: ReactType
}

interface Props {
    source: string
}

const renderers: Renderers = {
    "paragraph": Words,
    "listItem": ListItem,
    "link": Href,
    "table": Table,
    "tableRow": TableRow,
    "tableCell": TableData,
    "tableHead": TableHeader
};

/**
 * Renders a markdown string as formatted html
 * @param source
 * @constructor
 */
const Markdown: React.FC<Props> = ({source}) => <ReactMarkdown renderers={renderers} source={source}/>;

export default Markdown;