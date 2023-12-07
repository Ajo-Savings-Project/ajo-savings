import { v4 } from 'uuid'
import Settings from '../models/settings'
import Users from '../models/users'
import Wallets, { type } from '../models/wallets'

export const createGlobalWallet = async (user: Users) => {
  const globalWalletId = v4()
  const newGlobalWallet = await Wallets.create({
    id: globalWalletId,
    user_id: user.id,
    total_amount: 500000,
    type: type.GLOBAL,
    total_income: 0,
    earnings: [],
    created_at: new Date(),
  })
  return await Wallets.findOne({
    where: { id: newGlobalWallet.id },
  })
}

export const createSavingsWallet = async (user: Users) => {
  const savingsWalletId = v4()
  const newSavingsWallet = await Wallets.create({
    id: savingsWalletId,
    user_id: user.id,
    total_amount: 0,
    type: type.SAVINGS,
    total_income: 0,
    earnings: [],
    created_at: new Date(),
  })
  return await Wallets.findOne({
    where: { id: newSavingsWallet.id },
  })
}

export const createGroupWallet = async (user: Users) => {
  return await Wallets.create({
    id: v4(),
    user_id: user.id,
    total_amount: 1000,
    type: type.GROUP_WALLET,
    total_income: 0,
    earnings: [],
    created_at: new Date(),
  })

  // const personalGroupWallet = await Wallets.findOne({
  //   where: { id: newpersonalGroupWallet.id },
  // })

  // if (!wallet || !savingsWallet || !personalGroupWallet) {
  //   return await Users.destroy({ where: { id: user.id } })
  // }
}

export const createSettings = async (user: Users) => {
  return await Settings.create({
    id: v4(),
    owner_id: user.id,
  })
}
