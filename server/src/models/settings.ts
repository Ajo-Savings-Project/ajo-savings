import { Model, DataTypes, BuildOptions, Sequelize } from "sequelize";
import { db } from "../config";
import Users from "./users";

export interface SettingsAttribute{
    [x: string]: any;
    id: string
    owner_id :string
    email_notification : boolean 
    contribution_reminder: boolean 
    group_join_request:boolean
    two_factor_authentication : boolean
    password_update : boolean
    profile_visibility:boolean
    email_privacy:boolean
    savings_group_update :boolean
    personal_saving_alert:boolean
    deactivate_account:boolean
  
}

class Settings extends Model<SettingsAttribute>{

}

Settings.init(
    {
    
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        owner_id: {
            type: DataTypes.UUID,
        
          },
        email_notification : {
          type: DataTypes.BOOLEAN,
          allowNull: false, 
          defaultValue:true
        },
        contribution_reminder: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue:true
        },
        group_join_request: {
          type: DataTypes.BOOLEAN,          
          allowNull: false,
          defaultValue:true
        },
        two_factor_authentication: {
          type: DataTypes.BOOLEAN,       
          allowNull: false,
          defaultValue:true
        },
        password_update: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue:false
        },      
     
        profile_visibility: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue:true
        },
        email_privacy: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue:false
        },
        savings_group_update: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue:false
        },
        personal_saving_alert: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue:true
        },
        deactivate_account: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue:false
        },
        
    
      
    },

    {
        sequelize: db,
        tableName: "Settings",
        modelName: "Settings",
      }
)
export default Settings;