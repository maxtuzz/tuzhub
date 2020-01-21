import {HalLinks} from "./HalLink";

interface Hal {
    _links?: HalLinks
    _embedded?: object
}

export default Hal;