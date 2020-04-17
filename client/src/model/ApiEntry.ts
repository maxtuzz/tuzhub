import Hal from "./Hal";

interface ApiEntry extends Hal {
    displayName: string;
    name: string;
    description: string;
    fullSpec?: string
    specUrl?: string
    dynamicConf: boolean;
    authEnabled: boolean;
}

export default ApiEntry;