export interface HalLink {
    href: string;
    type: string;
}

export interface HalLinks {
    [s: string]: HalLink;
}
