import GroupMembers from './groupMembers'
import GroupWallet from './groupWallet'
import Groups from './groups'
import TargetWallet from './targetWallet'
import Targets from './targets'
import Transactions from './transactions'
import UserWallet from './userWallet'
import Users from './users'

GroupMembers.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user',
})

GroupMembers.belongsTo(Groups, {
  foreignKey: 'groupId',
  as: 'group',
})

Groups.belongsTo(Users, {
  foreignKey: 'adminId',
  as: 'user',
  targetKey: 'id',
})

Targets.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user',
  targetKey: 'id',
})

GroupWallet.belongsTo(Groups, {
  foreignKey: 'groupId',
})
TargetWallet.belongsTo(Targets, {
  foreignKey: 'targetId',
  as: 'wallet',
  onDelete: 'CASCADE',
})

UserWallet.belongsTo(Users, {
  foreignKey: 'userId',
  constraints: false,
})

Transactions.belongsTo(UserWallet, {
  foreignKey: 'userWalletId',
})

Transactions.belongsTo(GroupWallet, {
  foreignKey: 'groupWalletId',
})

Transactions.belongsTo(TargetWallet, {
  foreignKey: 'targetWalletId',
})

Groups.hasOne(GroupWallet, {
  foreignKey: 'groupId',
})

Targets.hasOne(TargetWallet, {
  foreignKey: 'targetId',
  as: 'wallet',
  onDelete: 'CASCADE',
})

Users.hasOne(UserWallet, {
  foreignKey: 'userId',
})

Groups.hasMany(GroupMembers, {
  foreignKey: 'groupId',
  as: 'groupMembers',
})

GroupWallet.hasMany(Transactions, {
  foreignKey: 'groupWalletId',
  as: 'groupWalletTransactions',
  onDelete: 'CASCADE',
})

TargetWallet.hasMany(Transactions, {
  foreignKey: 'targetWalletId',
  as: 'targetWalletTransactions',
  onDelete: 'CASCADE',
})
UserWallet.hasMany(Transactions, {
  foreignKey: 'userWalletId',
  as: 'userWalletTransactions',
  onDelete: 'CASCADE',
})

Users.hasMany(Groups, {
  foreignKey: 'adminId',
  as: 'adminGroups',
})

Users.hasMany(Targets, {
  foreignKey: 'userId',
  as: 'target',
})

Users.hasMany(GroupMembers, {
  foreignKey: 'userId',
  as: 'groupMembers',
})
