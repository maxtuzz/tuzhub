import Hal from "./Hal";

/**
 * List response supplies typing for hateoas resource wrapping
 */
interface ListResp<T> extends Hal {
    readonly content: T,
}

export default ListResp;
