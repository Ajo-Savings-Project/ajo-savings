import Wallets from './wallets'
import Transactions from './transactions'
import Users from './users'
import Savings from './savings'
import Groups from './groups'
import Payments from './payment'
import Settings from './settings'
import GroupTransactions from './groupTransactions'
import GroupContributors from './contributorsInGroup'
// import Earnings from "./walletEarnings"

// Define your associations here
Wallets.hasMany(Transactions, { foreignKey: 'walletId' })

Transactions.belongsTo(Wallets, { foreignKey: 'walletId' })

Transactions.belongsTo(Users, { foreignKey: 'ownerId' })

Users.hasMany(Transactions, { foreignKey: 'ownerId' })

Users.hasMany(Savings, { foreignKey: 'userId' })

Savings.belongsTo(Users, { foreignKey: 'userId' })

Savings.hasMany(Transactions, { foreignKey: 'ownerId' })

Groups.hasMany(Transactions, { foreignKey: 'ownerId' })

// Groups.hasMany(GroupMembers, { foreignKey: 'adminId', as: 'members' })

Groups.hasMany(GroupTransactions, { foreignKey: 'groupId', as: 'members' })

GroupTransactions.hasMany(GroupContributors, {
  foreignKey: 'groupId',
  as: 'members',
})

// GroupMembers.belongsTo(Groups, { foreignKey: 'adminId' })

GroupTransactions.belongsTo(Groups, { foreignKey: 'groupId' })

GroupContributors.belongsTo(GroupTransactions, { foreignKey: 'groupId' })

Users.hasMany(Payments, { foreignKey: 'ownerId' })

Settings.belongsTo(Users, { foreignKey: 'ownerId' })

Wallets.belongsTo(Users, { foreignKey: 'ownerId' })

Wallets.belongsTo(Groups, { foreignKey: 'ownerId' })

Wallets.belongsTo(Savings, { foreignKey: 'ownerId' })
// Wallets.hasMany(Earnings, { foreignKey: 'walletId' });
// Earnings.belongsTo(Wallets, { foreignKey: 'walletId' });
