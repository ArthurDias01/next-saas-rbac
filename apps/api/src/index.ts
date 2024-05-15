import { defineAbilityFor, projectSchema } from '@saas/auth'

const ability = defineAbilityFor({ role: 'MEMBER', id: '1'})

const project = projectSchema.parse({ id: 'user-id', ownerId: '1' })

console.log(ability.can('get', 'Billing'))
console.log(ability.can('create','Invite'))
console.log(ability.can('delete', project))

