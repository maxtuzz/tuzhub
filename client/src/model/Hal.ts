import {HalLinks} from "./HalLink";

interface Hal<T = object> {
    _links: HalLinks
    _embedded?: T
}

export default Hal;