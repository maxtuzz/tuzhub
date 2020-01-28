import Hal from "./Hal";

import {OpenAPIV3} from "openapi-types";

export default interface ApiSpec extends Hal {
    apiName: string
    specVersion: string
    status: "ACTIVE" | "HISTORIC" | "PRE_RELEASE" | "ADMIN_ONLY" | "HIDDEN"
    specUrl: string
    spec: OpenAPIV3.Document | any
}