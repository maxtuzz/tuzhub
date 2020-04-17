import Hal from "./Hal";

interface ApiEntry extends Hal {
    displayName: string;
    name: string;
    description: string;
    fullSpec?: string | object;
    specUrl?: string
    dynamicConf: boolean;
    authEnabled: boolean;
}

export default ApiEntry;