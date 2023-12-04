import Wallets from './wallets'
import Transactions from './transactions'
import Users from './users'
import Savings from './savings'
import Groups from './groups'
import Payments from './payment'
import Settings from './settings'

// Define your associations here
Wallets.hasMany(Transactions, {
  foreignKey: 'wallet_id',
})

Transactions.belongsTo(Wallets, {
  foreignKey: 'wallet_id',
})

Transactions.belongsTo(Users, {
  foreignKey: 'owner_id',
})

Users.hasMany(Transactions, {
  foreignKey: 'owner_id',
})

Savings.belongsTo(Users, {
  foreignKey: 'user_id',
})

Groups.hasMany(Transactions, {
  foreignKey: 'owner_id',
})

Users.hasMany(Payments, {
  foreignKey: 'owner_id',
})

Settings.belongsTo(Users, {
  foreignKey: 'owner_id',
})

Wallets.belongsTo(Users, { foreignKey: 'user_id' })
