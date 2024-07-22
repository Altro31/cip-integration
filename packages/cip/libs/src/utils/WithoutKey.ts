import {OmitType} from "@nestjs/swagger";

export interface WithoutKey {
    a: string
}

/*
WithoutKey() {
        const thisClass = this

        // @ts-ignore
        class WithoutKey extends OmitType(thisClass, ['id'] as const) {
        }

        return WithoutKey
    }

    WithoutKeyType() {
        const thisClass = this
        return {} as Omit<typeof thisClass, "id">
    }
 */