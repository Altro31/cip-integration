import type { RuleObject } from 'ant-design-vue/es/form'

export interface Schema {
  [name: string]: RuleObject | RuleObject[]
}
