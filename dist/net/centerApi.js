import { CenterApiBase } from './uqApi';
export class CenterApi extends CenterApiBase {
    async userAppUnits(app) {
        return await this.get('tie/user-app-units', { app: app });
    }
    async userFromKey(userName) {
        return await this.get('tie/user-from-key', { key: userName });
    }
    async userFromId(userId) {
        return await this.get('user/user-name-nick-icon-from-id', { userId: userId });
    }
    async userFromName(userName) {
        return await this.get('tie/user-from-key', { key: userName });
    }
    async usersFromEmail(email) {
        return await this.get('tie/users-from-email', { email });
    }
    async userFromMobile(mobile) {
        return await this.get('tie/users-from-mobile', { mobile });
    }
}
//# sourceMappingURL=centerApi.js.map