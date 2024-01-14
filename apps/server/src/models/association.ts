import Wallets from './wallets'
import Transactions from './transactions'
import Users from './users'
import Savings from './savings'
import Groups from './groups'
import Payments from './payment'
import Settings from './settings'

// Define your associations here
Wallets.hasMany(Transactions, { foreignKey: 'walletId' })

Transactions.belongsTo(Wallets, { foreignKey: 'walletId' })

Transactions.belongsTo(Users, { foreignKey: 'ownerId' })

Users.hasMany(Transactions, { foreignKey: 'ownerId' })

Users.hasMany(Savings, { foreignKey: 'userId' })

Savings.belongsTo(Users, { foreignKey: 'userId' })

Savings.hasMany(Transactions, { foreignKey: 'ownerId' })

Groups.hasMany(Transactions, { foreignKey: 'ownerId' })

Users.hasMany(Payments, { foreignKey: 'ownerId' })

Settings.belongsTo(Users, { foreignKey: 'ownerId' })

Wallets.belongsTo(Users, { foreignKey: 'ownerId' })

Wallets.belongsTo(Groups, { foreignKey: 'ownerId' })

Wallets.belongsTo(Savings, { foreignKey: 'ownerId' })
