import Hal from "./Hal";

interface ApiEntry extends Hal {
    displayName: string;
    name: string;
    dynamicConf: boolean;
    authEnabled: boolean;
}

export default ApiEntry;