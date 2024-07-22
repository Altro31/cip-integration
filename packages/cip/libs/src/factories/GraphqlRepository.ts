import {ModelMap} from "quien-es-quien/graphql/types-generated";


export function GraphqlRepository<T extends ModelMap>(model: T) {

    return class {
        protected readonly model: T
    }
}